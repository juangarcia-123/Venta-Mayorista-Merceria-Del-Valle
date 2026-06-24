import { productos, categorias } from '../productos.js'
import { formatPeso, $, $$, addToCart, openQuickView } from './main.js'

const ddIcons = ['🔩','🩱','🪢','🧵','☕','🔧','🎀','✨','🖼️','📦','💍','👞','⭕','🧴','⚙️','🎗️','🧶']

const allCats = [{ id: 'todas', label: 'Todas', icon: '📋' }, ...categorias.map((c, i) => ({ ...c, icon: ddIcons[i % ddIcons.length] }))]
let activeCategory = 'todas'
let searchQuery = ''
let sortBy = 'default'
let viewMode = 'grid'
let priceMin = ''
let priceMax = ''

function getParams() {
  const p = new URLSearchParams(window.location.search)
  const cat = p.get('cat')
  if (cat && categorias.some(c => c.id === cat)) activeCategory = cat
  if (p.get('q')) searchQuery = p.get('q')
  if (p.get('sort')) sortBy = p.get('sort')
  if (p.get('view')) viewMode = p.get('view')
  if (p.get('pmin')) priceMin = p.get('pmin')
  if (p.get('pmax')) priceMax = p.get('pmax')
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

  const min = parseFloat(priceMin)
  const max = parseFloat(priceMax)
  if (!isNaN(min)) result = result.filter(p => p.precio >= min)
  if (!isNaN(max)) result = result.filter(p => p.precio <= max)

  if (sortBy === 'price-asc') result.sort((a, b) => a.precio - b.precio)
  else if (sortBy === 'price-desc') result.sort((a, b) => b.precio - a.precio)
  else if (sortBy === 'name-asc') result.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  else if (sortBy === 'name-desc') result.sort((a, b) => b.nombre.localeCompare(a.nombre, 'es'))

  return result
}

function simulateStock() {
  const r = Math.random()
  if (r < 0.5) return { cls: 'alto', label: 'En stock' }
  if (r < 0.8) return { cls: 'medio', label: 'Stock medio' }
  return { cls: 'bajo', label: 'Pocas unidades' }
}

function renderFilters() {
  const grid = $('#filterGrid')
  grid.innerHTML = allCats.map(c =>
    `<button class="cat-filter-btn${c.id === activeCategory ? ' active' : ''}" data-cat="${c.id}">
      <span class="cf-icon">${c.icon}</span>
      ${c.label}
    </button>`
  ).join('')
}

function renderActiveFilters() {
  const el = $('#activeFilters')
  if (!el) return
  const tags = []

  if (activeCategory !== 'todas') {
    const label = allCats.find(c => c.id === activeCategory)?.label
    tags.push(`<span class="af-tag">${label} <button class="af-tag-remove" data-filter="cat">✕</button></span>`)
  }
  if (searchQuery.trim()) {
    tags.push(`<span class="af-tag">"${searchQuery.trim()}" <button class="af-tag-remove" data-filter="search">✕</button></span>`)
  }
  if (priceMin || priceMax) {
    const label = `${priceMin ? '$' + priceMin : '$0'} — ${priceMax ? '$' + priceMax : '∞'}`
    tags.push(`<span class="af-tag">${label} <button class="af-tag-remove" data-filter="price">✕</button></span>`)
  }

  el.innerHTML = tags.join('')
}

function renderProducts() {
  const grid = $('#productGrid')
  const countEl = $('#resultCount')
  const filtered = getFiltered()

  grid.className = `product-grid${viewMode === 'list' ? ' list' : ''}`

  if (countEl) {
    const total = getFiltered.length || filtered.length
    countEl.textContent = `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''}`
  }

  renderActiveFilters()

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
    <div class="product-card" data-id="${p.id}" style="animation-delay:${i * 0.05}s">
      <div class="product-card-image-wrapper">
        <img class="product-card-image" src="${p.imagen}" alt="${p.nombre}" loading="lazy"/>
        ${p.oferta ? '<span class="product-card-badge">Oferta</span>' : ''}
        <button class="product-card-quick" data-id="${p.id}" aria-label="Vista rápida">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${categorias.find(c => c.id === p.categoria)?.label || p.categoria}</div>
        <h3 class="product-card-title">${p.nombre}</h3>
        <p class="product-card-desc">${p.descripcion}</p>
        <span class="stock-badge ${stock.cls}">${stock.label}</span>
        <div class="product-card-footer" style="margin-top:10px">
          <div>
            ${p.oferta ? `<span class="product-card-price old">${formatPeso(Math.round(p.precio * 1.25))}</span>` : ''}
            <span class="product-card-price">${formatPeso(p.precio)}</span>
          </div>
          <button class="add-to-cart" data-id="${p.id}" aria-label="Agregar al carrito">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
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
    card.style.transform = 'translateY(20px)'
    card.style.transition = `all 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`
    observer.observe(card)
  })
}

function updateUrl() {
  const params = new URLSearchParams()
  if (activeCategory !== 'todas') params.set('cat', activeCategory)
  if (searchQuery.trim()) params.set('q', searchQuery.trim())
  if (sortBy !== 'default') params.set('sort', sortBy)
  if (viewMode !== 'grid') params.set('view', viewMode)
  if (priceMin) params.set('pmin', priceMin)
  if (priceMax) params.set('pmax', priceMax)
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
      resetAllFilters()
      return
    }
    const quickBtn = e.target.closest('.product-card-quick')
    if (quickBtn) {
      e.stopPropagation()
      openQuickView(Number(quickBtn.dataset.id))
      return
    }
    const cartBtn = e.target.closest('.add-to-cart')
    if (cartBtn) {
      e.stopPropagation()
      addToCart(Number(cartBtn.dataset.id))
      return
    }
    const card = e.target.closest('.product-card')
    if (card) openQuickView(Number(card.dataset.id))
  })

  $('#activeFilters').addEventListener('click', e => {
    const btn = e.target.closest('.af-tag-remove')
    if (!btn) return
    const filter = btn.dataset.filter
    if (filter === 'cat') { activeCategory = 'todas'; renderFilters() }
    else if (filter === 'search') { $('#searchInput').value = ''; searchQuery = ''; $('#searchClear').classList.remove('visible') }
    else if (filter === 'price') { priceMin = ''; priceMax = ''; $('#priceMin').value = ''; $('#priceMax').value = '' }
    renderProducts()
    updateUrl()
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

  document.querySelectorAll('.vt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vt-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      viewMode = btn.dataset.view
      renderProducts()
      updateUrl()
    })
  })

  $('#priceApply').addEventListener('click', () => {
    priceMin = $('#priceMin').value
    priceMax = $('#priceMax').value
    renderProducts()
    updateUrl()
  })
  ;[$('#priceMin'), $('#priceMax')].forEach(el => {
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter') $('#priceApply').click()
    })
  })
}

function resetAllFilters() {
  activeCategory = 'todas'
  searchQuery = ''
  sortBy = 'default'
  priceMin = ''
  priceMax = ''
  $('#searchInput').value = ''
  $('#searchClear').classList.remove('visible')
  $('#sortSelect').value = 'default'
  $('#priceMin').value = ''
  $('#priceMax').value = ''
  renderFilters()
  renderProducts()
  updateUrl()
}

function initFromUrl() {
  getParams()
  if (searchQuery) {
    $('#searchInput').value = searchQuery
    $('#searchClear').classList.toggle('visible', true)
  }
  if (sortBy !== 'default') $('#sortSelect').value = sortBy
  if (viewMode !== 'grid') {
    document.querySelectorAll('.vt-btn').forEach(b => b.classList.remove('active'))
    document.querySelector(`.vt-btn[data-view="${viewMode}"]`)?.classList.add('active')
  }
  if (priceMin) $('#priceMin').value = priceMin
  if (priceMax) $('#priceMax').value = priceMax
}

renderFilters()
initFromUrl()
renderProducts()
bindEvents()
