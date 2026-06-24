import { productos, categorias } from '../productos.js'
import { formatPeso, $, $$, addToCart, openQuickView } from './main.js'

const allCats = [{ id: 'todas', label: 'Todas' }, ...categorias]
let activeCategory = 'todas'
let searchQuery = ''
let sortBy = 'default'

function getInitialCat() {
  const params = new URLSearchParams(window.location.search)
  const cat = params.get('cat')
  if (cat && categorias.some(c => c.id === cat)) return cat
  return 'todas'
}

function getFiltered() {
  let result = [...productos]

  if (activeCategory !== 'todas') {
    result = result.filter(p => p.categoria === activeCategory)
  }

  if (searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase()
    result = result.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q) ||
      categorias.find(c => c.id === p.categoria)?.label.toLowerCase().includes(q)
    )
  }

  if (sortBy === 'price-asc') result.sort((a, b) => a.precio - b.precio)
  else if (sortBy === 'price-desc') result.sort((a, b) => b.precio - a.precio)
  else if (sortBy === 'name-asc') result.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  else if (sortBy === 'name-desc') result.sort((a, b) => b.nombre.localeCompare(a.nombre, 'es'))

  return result
}

function simulateStock() {
  const r = Math.random()
  if (r < 0.5) return 'alto'
  if (r < 0.8) return 'medio'
  return 'bajo'
}

const stockLabels = { alto: 'En stock', medio: 'Stock medio', bajo: 'Pocas unidades' }

function renderFilters() {
  const grid = $('#filterGrid')
  grid.innerHTML = allCats.map(c =>
    `<button class="cat-filter-btn${c.id === activeCategory ? ' active' : ''}" data-cat="${c.id}">${c.label}</button>`
  ).join('')
}

function renderProducts() {
  const grid = $('#productGrid')
  const countEl = $('#resultCount')
  const filtered = getFiltered()

  if (countEl) {
    countEl.textContent = `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''}`
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-title">Sin resultados</div>
        <div class="empty-state-text">No encontramos productos que coincidan con tu búsqueda.</div>
        <button class="empty-state-btn" id="clearSearchBtn">Limpiar filtros</button>
      </div>
    `
    return
  }

  grid.innerHTML = filtered.map((p, i) => {
    const stock = simulateStock()
    return `
    <div class="product-card" data-id="${p.id}" style="animation-delay:${i * 0.06}s">
      <div class="product-card-image-wrapper">
        <img class="product-card-image" src="${p.imagen}" alt="${p.nombre}" loading="lazy"/>
        ${p.oferta ? '<span class="product-card-badge">Oferta</span>' : ''}
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${categorias.find(c => c.id === p.categoria)?.label || p.categoria}</div>
        <h3 class="product-card-title">${p.nombre}</h3>
        <p class="product-card-desc">${p.descripcion}</p>
        <span class="stock-badge ${stock}">${stockLabels[stock]}</span>
        <div class="product-card-footer" style="margin-top:12px">
          <div>
            ${p.oferta ? `<span class="product-card-price old">${formatPeso(Math.round(p.precio * 1.25))}</span>` : ''}
            <span class="product-card-price">${formatPeso(p.precio)}</span>
          </div>
          <button class="add-to-cart" data-id="${p.id}" aria-label="Agregar al carrito">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>`
  }).join('')

  initScrollReveal()
}

function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  const cards = $$('.product-card')
  cards.forEach((card, i) => {
    card.style.opacity = '0'
    card.style.transform = 'translateY(24px)'
    card.style.transition = `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s`
    observer.observe(card)
  })
}

function updateUrl() {
  const params = new URLSearchParams()
  if (activeCategory !== 'todas') params.set('cat', activeCategory)
  if (searchQuery.trim()) params.set('q', searchQuery.trim())
  if (sortBy !== 'default') params.set('sort', sortBy)
  const qs = params.toString()
  const url = qs ? `/productos.html?${qs}` : '/productos.html'
  window.history.replaceState(null, '', url)
}

function bindEvents() {
  $('#filterGrid').addEventListener('click', e => {
    const btn = e.target.closest('.cat-filter-btn')
    if (!btn) return
    activeCategory = btn.dataset.cat
    renderFilters()
    renderProducts()
    updateUrl()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  $('#productGrid').addEventListener('click', e => {
    const clearBtn = e.target.closest('#clearSearchBtn')
    if (clearBtn) {
      $('#searchInput').value = ''
      searchQuery = ''
      $('#searchClear').classList.remove('visible')
      renderProducts()
      updateUrl()
      return
    }

    const btn = e.target.closest('.add-to-cart')
    if (btn) {
      e.stopPropagation()
      addToCart(Number(btn.dataset.id))
      return
    }
    const card = e.target.closest('.product-card')
    if (card) openQuickView(Number(card.dataset.id))
  })

  const searchInput = $('#searchInput')
  let searchTimer

  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      searchQuery = searchInput.value
      $('#searchClear').classList.toggle('visible', searchQuery.length > 0)
      renderFilters()
      renderProducts()
      updateUrl()
    }, 250)
  })

  $('#searchClear').addEventListener('click', () => {
    searchInput.value = ''
    searchQuery = ''
    $('#searchClear').classList.remove('visible')
    renderFilters()
    renderProducts()
    updateUrl()
    searchInput.focus()
  })

  $('#sortSelect').addEventListener('change', e => {
    sortBy = e.target.value
    renderProducts()
    updateUrl()
  })
}

function initFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const q = params.get('q')
  if (q) {
    searchQuery = q
    $('#searchInput').value = q
    $('#searchClear').classList.toggle('visible', true)
  }
  const sort = params.get('sort')
  if (sort) {
    sortBy = sort
    $('#sortSelect').value = sort
  }
}

renderFilters()
initFromUrl()
renderProducts()
bindEvents()
