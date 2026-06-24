export const categorias = [
  { id: 'herrajes-varios', label: 'Herrajes Varios' },
  { id: 'accesorios-lenceria', label: 'Acc. Lencería' },
  { id: 'elasticos-lenceria', label: 'Elásticos Lencería' },
  { id: 'tanzas', label: 'Tanzas' },
  { id: 'tazas', label: 'Tazas' },
  { id: 'repuestos-lenceria', label: 'Rep. Lencería' },
  { id: 'cintas-navidenas', label: 'Cintas Navideñas' },
  { id: 'cintas-fantasias', label: 'Cintas Fantasías' },
  { id: 'bastidores-reglas', label: 'Bastidores / Reglas FF' },
  { id: 'articulos-importados', label: 'Art. Importados' },
  { id: 'armado-bijou', label: 'Armado / Bijou' },
  { id: 'tintas-pomadas', label: 'Tintas / Pomadas Calzado' },
  { id: 'ojales-remaches', label: 'Ojales / Remaches' },
  { id: 'adhesivos-pegamentos', label: 'Adhesivos / Pegamentos' },
  { id: 'maquinas-matrices', label: 'Máquinas / Matrices' },
  { id: 'galoneria', label: 'Galeronería' },
  { id: 'lanas-hilos-mochileras', label: 'Lanas, Hilos y Cintas Mochileras' },
]

export const productos = [
  // ── Herrajes Varios ──
  { id: 1, nombre: 'Hebilla Metálica Niquelada 25mm', categoria: 'herrajes-varios', precio: 3200, imagen: 'https://images.unsplash.com/photo-1611597617096-fe8c5e4f3b1e?w=400&q=80', descripcion: 'Hebilla de acero niquelado. Ideal para cintos, carteras y mochilas.' },
  { id: 2, nombre: 'Argolla Metálica 30mm x10', categoria: 'herrajes-varios', precio: 2800, imagen: 'https://images.unsplash.com/photo-1586461361589-924b7e4a4f7e?w=400&q=80', descripcion: 'Argollas de acero con costura. Presentación x10 unidades.' },
  { id: 3, nombre: 'Mosquetón Acero 50mm', categoria: 'herrajes-varios', precio: 4500, imagen: 'https://images.unsplash.com/photo-1591149229498-73f1b1e0f663?w=400&q=80', descripcion: 'Mosquetón de acero niquelado con resorte de seguridad.' },

  // ── Accesorios Lencería ──
  { id: 4, nombre: 'Broche Corredizo 3 Argollas', categoria: 'accesorios-lenceria', precio: 1800, imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', descripcion: 'Broche regulable 3 argollas para lencería y ropa interior.' },
  { id: 5, nombre: 'Gancho Ajustador Tipo Lencería x12', categoria: 'accesorios-lenceria', precio: 2500, imagen: 'https://images.unsplash.com/photo-1611597617096-fe8c5e4f3b1e?w=400&q=80', descripcion: 'Ganchos metálicos para corpiños. Incluye 12 unidades.' },
  { id: 6, nombre: 'Argolla Plástica Transparente 15mm x20', categoria: 'accesorios-lenceria', precio: 1200, imagen: 'https://images.unsplash.com/photo-1586461361589-924b7e4a4f7e?w=400&q=80', descripcion: 'Argollas de plástico resistente para lencería fina.' },

  // ── Elásticos Lencería ──
  { id: 7, nombre: 'Elástico Encaje 15mm Blanco', categoria: 'elasticos-lenceria', precio: 4200, imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', descripcion: 'Elástico con terminación en encaje. Rollo x10 metros.', oferta: true },
  { id: 8, nombre: 'Elástico Goma Lisa 10mm', categoria: 'elasticos-lenceria', precio: 2800, imagen: 'https://images.unsplash.com/photo-1591149229498-73f1b1e0f663?w=400&q=80', descripcion: 'Elástico de goma lisa de alta tensión. Rollo x20 metros.' },
  { id: 9, nombre: 'Elástico Encaje Negro 20mm', categoria: 'elasticos-lenceria', precio: 4800, imagen: 'https://images.unsplash.com/photo-1611597617096-fe8c5e4f3b1e?w=400&q=80', descripcion: 'Elástico encaje elastano. Rollo x10 metros.', oferta: true },

  // ── Tanzas ──
  { id: 10, nombre: 'Tanza Nylon Transparente 0.30mm', categoria: 'tanzas', precio: 3500, imagen: 'https://images.unsplash.com/photo-1586461361589-924b7e4a4f7e?w=400&q=80', descripcion: 'Tanza de nylon de alta resistencia. Bobina x100 metros.' },
  { id: 11, nombre: 'Tanza Cristal Elástica 0.50mm', categoria: 'tanzas', precio: 4200, imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', descripcion: 'Tanza elástica cristal para bisutería y armado.' },

  // ── Tazas ──
  { id: 12, nombre: 'Taza Algodón Blanca x5', categoria: 'tazas', precio: 8500, imagen: 'https://images.unsplash.com/photo-1591149229498-73f1b1e0f663?w=400&q=80', descripcion: 'Tazas de algodón para costura. Presentación x5 unidades.' },
  { id: 13, nombre: 'Taza Espuma Termoformada', categoria: 'tazas', precio: 6200, imagen: 'https://images.unsplash.com/photo-1611597617096-fe8c5e4f3b1e?w=400&q=80', descripcion: 'Taza de espuma para corpiños y lencería. Ideal para armado.' },

  // ── Repuestos Lencería ──
  { id: 14, nombre: 'Kit Reparación Corpiño x10', categoria: 'repuestos-lenceria', precio: 3800, imagen: 'https://images.unsplash.com/photo-1586461361589-924b7e4a4f7e?w=400&q=80', descripcion: 'Kit con elásticos, ganchos y argollas para reparación.' },
  { id: 15, nombre: 'Varilla Metálica Corpiño curva x5', categoria: 'repuestos-lenceria', precio: 4800, imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', descripcion: 'Varillas de acero recubiertas. Juego x5 unidades.' },

  // ── Cintas Navideñas ──
  { id: 16, nombre: 'Cinta Navideña Terciopelo Roja 50mm', categoria: 'cintas-navidenas', precio: 6500, imagen: 'https://images.unsplash.com/photo-1591149229498-73f1b1e0f663?w=400&q=80', descripcion: 'Cinta de terciopelo roja con bordes dorados. Rollo x5m.' },
  { id: 17, nombre: 'Cinta Navideña Estampada 25mm', categoria: 'cintas-navidenas', precio: 5200, imagen: 'https://images.unsplash.com/photo-1611597617096-fe8c5e4f3b1e?w=400&q=80', descripcion: 'Motivos navideños variados. Rollo x5 metros.', oferta: true },

  // ── Cintas Fantasías ──
  { id: 18, nombre: 'Cinta Brocato Dorada 40mm', categoria: 'cintas-fantasias', precio: 7500, imagen: 'https://images.unsplash.com/photo-1586461361589-924b7e4a4f7e?w=400&q=80', descripcion: 'Cinta brocato dorada con lurex. Rollo x5 metros.' },
  { id: 19, nombre: 'Cinta Organza Translúcida 15mm', categoria: 'cintas-fantasias', precio: 3800, imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', descripcion: 'Cinta de organza. 10 colores disponibles. Rollo x10m.' },

  // ── Bastidores / Reglas FF ──
  { id: 20, nombre: 'Bastidor Madera Redondo 20cm', categoria: 'bastidores-reglas', precio: 9500, imagen: 'https://images.unsplash.com/photo-1591149229498-73f1b1e0f663?w=400&q=80', descripcion: 'Bastidor de madera natural con tornillo ajustable.' },
  { id: 21, nombre: 'Regla Francesa Curva 60cm', categoria: 'bastidores-reglas', precio: 12500, imagen: 'https://images.unsplash.com/photo-1611597617096-fe8c5e4f3b1e?w=400&q=80', descripcion: 'Regla francesa de plástico transparente para costura.' },
  { id: 22, nombre: 'Bastidor Plástico Cuadrado 15cm', categoria: 'bastidores-reglas', precio: 4500, imagen: 'https://images.unsplash.com/photo-1586461361589-924b7e4a4f7e?w=400&q=80', descripcion: 'Bastidor plástico económico para bastidores pequeños.', oferta: true },

  // ── Artículos Importados ──
  { id: 23, nombre: 'Cierre Metálico Japonés YKK 45cm', categoria: 'articulos-importados', precio: 8500, imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', descripcion: 'Cierre YKK original importado. Alta durabilidad.' },
  { id: 24, nombre: 'Hilo Coser Japonés Fujix 300m', categoria: 'articulos-importados', precio: 6800, imagen: 'https://images.unsplash.com/photo-1611597617096-fe8c5e4f3b1e?w=400&q=80', descripcion: 'Hilo de coser japonés de primera calidad. 30 colores.' },

  // ── Armado / Bijou ──
  { id: 25, nombre: 'Kit Armado Aros x20', categoria: 'armado-bijou', precio: 3200, imagen: 'https://images.unsplash.com/photo-1586461361589-924b7e4a4f7e?w=400&q=80', descripcion: 'Base para aros 20mm. Incluye 20 pares.' },
  { id: 26, nombre: 'Cierre Abalorios Metálico x50', categoria: 'armado-bijou', precio: 2800, imagen: 'https://images.unsplash.com/photo-1591149229498-73f1b1e0f663?w=400&q=80', descripcion: 'Cierres metálicos para collares y pulseras. x50 unidades.' },
  { id: 27, nombre: 'Separador Flores Metálico x30', categoria: 'armado-bijou', precio: 2200, imagen: 'https://images.unsplash.com/photo-1611597617096-fe8c5e4f3b1e?w=400&q=80', descripcion: 'Separadores decorativos en forma de flor.' },

  // ── Tintas / Pomadas Calzado ──
  { id: 28, nombre: 'Tinta Cuero Negro 50ml', categoria: 'tintas-pomadas', precio: 4500, imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', descripcion: 'Tinta líquida para teñido de cuero y calzado.' },
  { id: 29, nombre: 'Pomada Lustrar Neutra 100g', categoria: 'tintas-pomadas', precio: 3800, imagen: 'https://images.unsplash.com/photo-1586461361589-924b7e4a4f7e?w=400&q=80', descripcion: 'Pomada para lustrar calzado. Fórmula neutra.' },
  { id: 30, nombre: 'Kit Teñido Cuero 4 Colores', categoria: 'tintas-pomadas', precio: 12500, imagen: 'https://images.unsplash.com/photo-1591149229498-73f1b1e0f663?w=400&q=80', descripcion: 'Kit profesional con 4 tintas básicas.', oferta: true },

  // ── Ojales / Remaches ──
  { id: 31, nombre: 'Ojal Metálico Dorado 10mm x20', categoria: 'ojales-remaches', precio: 2800, imagen: 'https://images.unsplash.com/photo-1611597617096-fe8c5e4f3b1e?w=400&q=80', descripcion: 'Ojales metálicos dorados con arandela. x20 unidades.' },
  { id: 32, nombre: 'Remache Acero 8mm x30', categoria: 'ojales-remaches', precio: 3500, imagen: 'https://images.unsplash.com/photo-1586461361589-924b7e4a4f7e?w=400&q=80', descripcion: 'Remaches de acero niquelado para calzado y marroquinería.' },
  { id: 33, nombre: 'Kit Ojales + Encastrador', categoria: 'ojales-remaches', precio: 15000, imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', descripcion: 'Kit completo con encastrador manual y 50 ojales.', oferta: true },

  // ── Adhesivos / Pegamentos ──
  { id: 34, nombre: 'Pegamento Universal Instantáneo 20g', categoria: 'adhesivos-pegamentos', precio: 2800, imagen: 'https://images.unsplash.com/photo-1591149229498-73f1b1e0f663?w=400&q=80', descripcion: 'Pegamento instantáneo multiuso. Fórmula profesional.' },
  { id: 35, nombre: 'Adhesivo Textil 100ml', categoria: 'adhesivos-pegamentos', precio: 5200, imagen: 'https://images.unsplash.com/photo-1611597617096-fe8c5e4f3b1e?w=400&q=80', descripcion: 'Adhesivo especial para tela, denim y materiales textiles.' },

  // ── Máquinas / Matrices ──
  { id: 36, nombre: 'Matriz Ojal 10mm Manual', categoria: 'maquinas-matrices', precio: 18500, imagen: 'https://images.unsplash.com/photo-1586461361589-924b7e4a4f7e?w=400&q=80', descripcion: 'Matriz intercambiable para encastrador manual.' },
  { id: 37, nombre: 'Máquina Encastradora Manual', categoria: 'maquinas-matrices', precio: 45000, imagen: 'https://images.unsplash.com/photo-1591149229498-73f1b1e0f663?w=400&q=80', descripcion: 'Máquina encastradora manual profesional. Incluye 3 matrices.' },

  // ── Galonería ──
  { id: 38, nombre: 'Galón Dorado 20mm x5m', categoria: 'galoneria', precio: 5500, imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', descripcion: 'Galón decorativo dorado con lurex. Rollo x5 metros.' },
  { id: 39, nombre: 'Pasamanería Flores Aplicada', categoria: 'galoneria', precio: 8500, imagen: 'https://images.unsplash.com/photo-1611597617096-fe8c5e4f3b1e?w=400&q=80', descripcion: 'Pasamanería con flores aplicadas. Ideal para cortineria.' },

  // ── Lanas, Hilos y Cintas Mochileras ──
  { id: 40, nombre: 'Cinta Mochilera 25mm Nylon x5m', categoria: 'lanas-hilos-mochileras', precio: 6200, imagen: 'https://images.unsplash.com/photo-1586461361589-924b7e4a4f7e?w=400&q=80', descripcion: 'Cinta de nylon resistente para mochilas y bolsos.' },
  { id: 41, nombre: 'Ovillo Lana Acrílica 100g', categoria: 'lanas-hilos-mochileras', precio: 3500, imagen: 'https://images.unsplash.com/photo-1591149229498-73f1b1e0f663?w=400&q=80', descripcion: 'Lana acrílica suave. 40 colores disponibles.', oferta: true },
  { id: 42, nombre: 'Hilo Macramé Algodón 3mm', categoria: 'lanas-hilos-mochileras', precio: 4800, imagen: 'https://images.unsplash.com/photo-1611597617096-fe8c5e4f3b1e?w=400&q=80', descripcion: 'Hilo de algodón para macramé. Rollo x50 metros.' },
  { id: 43, nombre: 'Cinta Mochilera Reflectiva 20mm', categoria: 'lanas-hilos-mochileras', precio: 7500, imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', descripcion: 'Cinta con detalle reflectivo para seguridad.', oferta: true },
]
