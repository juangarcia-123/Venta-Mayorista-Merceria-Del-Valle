import { productos, categorias } from '../productos.js'
import { formatPeso, $, $$, addToCart, openQuickView } from './main.js'

const allCats = [{ id: 'todas', label: 'Todas' }, ...categorias]
let activeCategory = 'todas'

function getInitialCat() {
  const params = new URLSearchParams(window.location.search)
  const cat = params.get('cat')
  if (cat && categorias.some(c => c.id === cat)) return cat
  return 'todas'
}

function renderFilters() {
  const grid = $('#filterGrid')
  activeCategory = getInitialCat()
  grid.innerHTML = allCats.map(c =>
    `<button class="cat-filter-btn${c.id === activeCategory ? ' active' : ''}" data-cat="${c.id}">${c.label}</button>`
  ).join('')
}

function renderProducts() {
  const grid = $('#productGrid')
  const countEl = $('#resultCount')
  const filtered = activeCategory === 'todas'
    ? productos
    : productos.filter(p => p.categoria === activeCategory)

  if (countEl) {
    countEl.textContent = `${filtered.length} producto${filtered.length !== 1 ? 's' : ''}`
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-card-image-wrapper">
        <img class="product-card-image" src="${p.imagen}" alt="${p.nombre}" loading="lazy"/>
        ${p.oferta ? '<span class="product-card-badge">Oferta</span>' : ''}
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${categorias.find(c => c.id === p.categoria)?.label || p.categoria}</div>
        <h3 class="product-card-title">${p.nombre}</h3>
        <p class="product-card-desc">${p.descripcion}</p>
        <div class="product-card-footer">
          <div>
            ${p.oferta ? `<span class="product-card-price old">${formatPeso(Math.round(p.precio * 1.25))}</span>` : ''}
            <span class="product-card-price">${formatPeso(p.precio)}</span>
          </div>
          <button class="add-to-cart" data-id="${p.id}" aria-label="Agregar al carrito">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('')

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
    card.style.transform = 'translateY(30px)'
    card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`
    observer.observe(card)
  })
}

function bindEvents() {
  $('#filterGrid').addEventListener('click', e => {
    const btn = e.target.closest('.cat-filter-btn')
    if (!btn) return
    activeCategory = btn.dataset.cat
    const url = activeCategory === 'todas'
      ? '/productos.html'
      : `/productos.html?cat=${activeCategory}`
    window.history.replaceState(null, '', url)
    renderFilters()
    renderProducts()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  $('#productGrid').addEventListener('click', e => {
    const btn = e.target.closest('.add-to-cart')
    if (btn) {
      e.stopPropagation()
      addToCart(Number(btn.dataset.id))
      return
    }
    const card = e.target.closest('.product-card')
    if (card) openQuickView(Number(card.dataset.id))
  })
}

renderFilters()
renderProducts()
bindEvents()
