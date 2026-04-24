# ⛵ ExcursionBotes

> Sitio web informativo y de reservas para **Excursiones en Bote** — experiencias acuáticas únicas para toda la familia.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red?style=flat)


---

## 📋 Tabla de contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Despliegue en Netlify](#-despliegue-en-netlify)
- [URL en producción](#-url-en-producción)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 📖 Descripción

**ExcursionBotes** es una landing page de una sola página (*single-page*) diseñada con una interfaz moderna en tono Aqua (`#00C9C8`). Permite a los visitantes conocer los paquetes disponibles, leer testimonios de clientes y realizar una reserva directamente desde el sitio.

---

## ✨ Características

| Sección | Descripción |
|---------|-------------|
| 🎠 **Carrusel de fotos** | Interactivo con swipe táctil y autoplay |
| 📊 **Estadísticas animadas** | Clientes, años de experiencia, rutas y satisfacción |
| 🧭 **Nosotros** | Valores, misión y características de la empresa |
| 🗺️ **6 Paquetes** | Básico, Aventura Marina, Premium, Atardecer, Familiar y Corporativo |
| 💬 **Testimonios** | Reseñas reales de clientes |
| 📬 **Formulario de reserva** | Formulario completo integrado en la página |
| 🌐 **Redes sociales** | Instagram, Facebook, WhatsApp, TikTok y YouTube |
| 💬 **WhatsApp flotante** | Botón de acceso rápido siempre visible |
| 📱 **100% Responsive** | Optimizado para móvil, tablet y escritorio |

---

## 🛠️ Tecnologías

- **HTML5** — estructura semántica
- **CSS3** — variables, animaciones, Flexbox y Grid
- **JavaScript (ES6+)** — carrusel, animaciones de estadísticas y formulario
- **Google Fonts** — tipografía Poppins
- **Netlify** — hosting y CI/CD

---

## 🧱 Estructura del proyecto

```
Excursionbotes-/
├── index.html       # Página principal (HTML + CSS + JS en un solo archivo)
├── netlify.toml     # Configuración de Netlify (redirects, headers, caché)
└── README.md
```

---

## 🚀 Despliegue en Netlify

### Opción A — Un clic (recomendado)

Haz clic en el botón **"Deploy to Netlify"** al inicio de este README. Netlify clonará el repositorio y publicará el sitio automáticamente.

### Opción B — Despliegue manual

1. Accede a [app.netlify.com](https://app.netlify.com) y selecciona **"Add new site → Import an existing project"**.
2. Conecta tu cuenta de GitHub y elige el repositorio `jeremyagnz/Excursionbotes-`.
3. Usa la siguiente configuración:

   | Campo | Valor |
   |-------|-------|
   | **Branch to deploy** | `main` |
   | **Base directory** | *(vacío)* |
   | **Build command** | *(vacío)* |
   | **Publish directory** | `.` |

4. Haz clic en **"Deploy site"**.

> El archivo `netlify.toml` ya incluye redirects, headers de seguridad y políticas de caché — no se requiere configuración adicional.

### Deploy Previews

Cada Pull Request genera automáticamente una URL de preview única:

```
https://deploy-preview-<PR_NUMBER>--excursionbotes.netlify.app
```

Netlify publica el enlace directamente en el PR como comentario. 🎉

---

## 🌐 URL en producción

```
https://excursionbotes.netlify.app
```

> Para cambiar el nombre del sitio, ve a **Site settings → General → Site name** en Netlify.

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Para contribuir:

1. Haz un fork del repositorio.
2. Crea una rama con tu mejora: `git checkout -b feature/mi-mejora`.
3. Realiza tus cambios y haz commit: `git commit -m "feat: descripción del cambio"`.
4. Sube tu rama: `git push origin feature/mi-mejora`.
5. Abre un **Pull Request** describiendo los cambios realizados.

---

## 📝 Licencia

Distribuido bajo una **licencia propietaria — Todos los derechos reservados**. Consulta el archivo [`LICENSE`](LICENSE) para más información.
