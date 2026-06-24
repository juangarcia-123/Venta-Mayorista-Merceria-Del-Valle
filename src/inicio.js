import { productos, categorias } from '../productos.js'
import { formatPeso, $, $$, addToCart, openQuickView } from './main.js'

function renderShowcase() {
  const grid = $('#showcaseGrid')
  if (!grid) return
  const items = productos.filter(p => p.oferta).slice(0, 6)

  grid.innerHTML = items.map(p => `
    <div class="showcase-card" data-id="${p.id}">
      <div class="showcase-card-img-wrap">
        <img class="showcase-card-img" src="${p.imagen}" alt="${p.nombre}" loading="lazy"/>
        <span class="showcase-card-badge">Oferta</span>
      </div>
      <div class="showcase-card-body">
        <div class="showcase-card-cat">${categorias.find(c => c.id === p.categoria)?.label || p.categoria}</div>
        <h3 class="showcase-card-title">${p.nombre}</h3>
        <div>
          <span class="showcase-card-price-old">${formatPeso(Math.round(p.precio * 1.25))}</span>
          <span class="showcase-card-price">${formatPeso(p.precio)}</span>
        </div>
      </div>
    </div>
  `).join('')

  grid.addEventListener('click', e => {
    const card = e.target.closest('.showcase-card')
    if (card) openQuickView(Number(card.dataset.id))
  })
}

function initHeroAnimations() {
  const heroCircle = $('#heroCircle')
  if (heroCircle) {
    heroCircle.animate([
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' }
    ], { duration: 20000, iterations: Infinity, easing: 'linear' })
  }

  const particles = $('#particles')
  if (particles) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      p.style.left = Math.random() * 100 + '%'
      p.style.top = Math.random() * 100 + '%'
      p.style.width = p.style.height = (2 + Math.random() * 4) + 'px'
      p.style.animation = `float ${4 + Math.random() * 6}s ${Math.random() * 4}s infinite ease-in-out`
      p.style.opacity = 0.1 + Math.random() * 0.3
      particles.appendChild(p)
    }
  }

  const style = document.createElement('style')
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
      50% { transform: translateY(-30px) rotate(180deg); opacity: 0.5; }
    }
  `
  document.head.appendChild(style)
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

  const cards = $$('.showcase-card')
  cards.forEach((card, i) => {
    card.style.opacity = '0'
    card.style.transform = 'translateY(30px)'
    card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`
    observer.observe(card)
  })
}

renderShowcase()
initHeroAnimations()
initScrollReveal()
