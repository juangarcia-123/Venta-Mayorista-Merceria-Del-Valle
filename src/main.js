import { productos, categorias } from '../productos.js'

export const formatPeso = n => '$' + n.toLocaleString('es-AR')
export const $ = s => document.querySelector(s)
export const $$ = s => document.querySelectorAll(s)

export let cart = JSON.parse(sessionStorage.getItem('cart') || '[]')

export function saveCart() {
  sessionStorage.setItem('cart', JSON.stringify(cart))
}

export function renderCart() {
  const container = $('#cartItems')
  const footer = $('#cartFooter')
  const totalEl = $('#cartTotal')
  const countEl = $('#cartCount')
  const labelEl = $('#cartCountLabel')
  if (!container) return

  const totalQty = cart.reduce((s, i) => s + i.qty, 0)

  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p class="cart-empty-text">Tu carrito está vacío</p></div>`
    if (footer) footer.style.display = 'none'
    if (countEl) countEl.textContent = '0'
    if (labelEl) labelEl.textContent = '0'
    return
  }

  if (countEl) countEl.textContent = totalQty
  if (labelEl) labelEl.textContent = totalQty

  container.innerHTML = cart.map((item, idx) => `
    <div class="cart-item" style="animation-delay:${idx * 0.05}s">
      <img class="cart-item-img" src="${item.imagen}" alt="${item.nombre}" loading="lazy"/>
      <div class="cart-item-info">
        <div class="cart-item-title">${item.nombre}</div>
        <div class="cart-item-price">${formatPeso(item.precio)}</div>
        <div class="cart-item-qty">
          <button data-idx="${idx}" data-action="dec">−</button>
          <span>${item.qty}</span>
          <button data-idx="${idx}" data-action="inc">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-idx="${idx}" aria-label="Eliminar">✕</button>
    </div>
  `).join('')

  const total = cart.reduce((s, i) => s + i.precio * i.qty, 0)
  if (totalEl) totalEl.textContent = formatPeso(total)
  if (footer) footer.style.display = 'block'
}

export function addToCart(id) {
  const p = productos.find(x => x.id === id)
  if (!p) return
  const existing = cart.find(i => i.id === id)
  if (existing) { existing.qty++ } else { cart.push({ ...p, qty: 1 }) }
  saveCart()
  renderCart()

  const btn = $('#cartBtn')
  if (btn) {
    btn.classList.remove('bump')
    void btn.offsetWidth
    btn.classList.add('bump')
  }

  showToast(`✓ ${p.nombre} agregado al carrito`)
}

export function showToast(msg) {
  const t = $('#toast')
  if (!t) return
  t.innerHTML = `<span class="toast-icon">✓</span> ${msg}`
  t.classList.add('show')
  clearTimeout(t._timeout)
  t._timeout = setTimeout(() => t.classList.remove('show'), 2800)
}

export function openQuickView(productId) {
  const p = productos.find(x => x.id === productId)
  if (!p) return
  const overlay = $('#modalOverlay')
  const cat = categorias.find(c => c.id === p.categoria)

  $('#modalImg').src = p.imagen
  $('#modalImg').alt = p.nombre
  $('#modalCat').textContent = cat?.label || p.categoria
  $('#modalTitle').textContent = p.nombre
  $('#modalDesc').textContent = p.descripcion
  $('#modalPrice').textContent = formatPeso(p.precio)

  const oldEl = $('#modalPriceOld')
  if (p.oferta) {
    oldEl.textContent = formatPeso(Math.round(p.precio * 1.25))
    oldEl.style.display = 'inline'
  } else {
    oldEl.style.display = 'none'
  }

  $('#modalAdd').dataset.id = p.id
  overlay.classList.add('open')
  document.body.style.overflow = 'hidden'
}

const ddIcons = ['🔩','🩱','🪢','🧵','☕','🔧','🎀','✨','🖼️','📦','💍','👞','⭕','🧴','⚙️','🎗️','🧶']

export function renderNavDropdown() {
  const el = $('#navDropdown')
  if (!el) return
  el.innerHTML = categorias.map((c, i) =>
    `<a href="/productos.html?cat=${c.id}">
      <span class="dd-icon">${ddIcons[i % ddIcons.length]}</span>
      ${c.label}
    </a>`
  ).join('')
}

function bindCartEvents() {
  const overlay = $('#cartOverlay')
  const sidebar = $('#cartSidebar')
  if (!sidebar) return

  $('#cartBtn')?.addEventListener('click', () => {
    sidebar.classList.add('open')
    overlay.classList.add('open')
  })

  const closeCart = () => {
    sidebar.classList.remove('open')
    overlay.classList.remove('open')
  }
  $('#cartClose')?.addEventListener('click', closeCart)
  overlay?.addEventListener('click', closeCart)

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if ($('#cartSidebar.open')) closeCart()
      if ($('#modalOverlay.open')) closeModal()
    }
  })

  $('#cartItems')?.addEventListener('click', e => {
    const btn = e.target.closest('button')
    if (!btn) return
    const idx = Number(btn.dataset.idx)

    if (btn.dataset.action === 'inc') {
      cart[idx].qty++
    } else if (btn.dataset.action === 'dec') {
      cart[idx].qty--
      if (cart[idx].qty <= 0) cart.splice(idx, 1)
    } else {
      cart.splice(idx, 1)
    }
    saveCart()
    renderCart()
  })

  $('.checkout-btn')?.addEventListener('click', () => {
    const msg = cart.map(i => `• ${i.nombre} x${i.qty} = ${formatPeso(i.precio * i.qty)}`).join('\n')
    const total = cart.reduce((s, i) => s + i.precio * i.qty, 0)
    alert(`Cotización:\n\n${msg}\n\nTotal: ${formatPeso(total)}\n\nComuníquese con nosotros para finalizar su pedido.`)
  })
}

function bindModalEvents() {
  const overlay = $('#modalOverlay')
  if (!overlay) return

  const closeModal = () => {
    overlay.classList.remove('open')
    document.body.style.overflow = ''
  }

  $('#modalClose')?.addEventListener('click', closeModal)
  overlay?.addEventListener('click', e => {
    if (e.target === overlay) closeModal()
  })

  window.closeModal = closeModal

  $('#modalAdd')?.addEventListener('click', () => {
    const id = Number($('#modalAdd').dataset.id)
    addToCart(id)
  })
}

function initScrollHeader() {
  const header = $('#header')
  if (!header) return
  let ticking = false
  if (header.dataset.permanent === 'true') return
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 80)
        ticking = false
      })
      ticking = true
    }
  }, { passive: true })
}

renderNavDropdown()
renderCart()
initScrollHeader()
bindCartEvents()
bindModalEvents()
