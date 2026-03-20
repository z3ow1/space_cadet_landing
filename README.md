# Space Cadet Mining Landing Page

Web de presentación para la beta de Space Cadet Mining. Hecha en Vue 3 + Vite, sin backend, sin base de datos. Se sube el `dist/` a cualquier hosting estático y listo.

Tiene soporte para 5 idiomas (ES, EN, PT, DE, RU), galería de capturas con lightbox, sección de descarga del .exe, stats animados, y un sistema básico de seguridad client-side.

---

## Configuración

Todo lo que vas a querer cambiar está en dos archivos:

### `src/constants/config.js`

```js
export const DOWNLOAD_URL = './assets/file/SpaceCadetMining_Beta.exe'  // ruta al .exe solo sube tu .exe 
export const GAME_VERSION = '0.4.2-beta'                          // versión que aparece en la web
export const RELEASE_DATE = '2026-03-19'                          // fecha de lanzamiento

// Dentro de /assets/file/ pones el nombre de tu Windows ejecutable, a si que es necesario que ustedes suban el archivo y cambien el nombre a DOWNLOAD_URL

// Capturas de pantalla para la galería
// Poné los archivos en public/assets/screenshots/ y descomentá las líneas
export const SCREENSHOTS = [
  { src: './assets/screenshots/1.jpg', alt: 'descripción', title: 'Título en hover' },
]

// Redes sociales (dejá el string vacío si no querés que aparezca)
export const SOCIAL_LINKS = {
  discord: '',
  twitter: '',
  youtube: ''
}

// Requisitos del sistema que aparecen en la sección beta
export const SYSTEM_REQUIREMENTS = {
  OS: 'Windows 10 / 11 (64-bit)',
  CPU: 'Intel Core i5 / AMD Ryzen 5',
  RAM: '8 GB',
  GPU: 'NVIDIA GTX 1060 / AMD RX 580',
  Storage: '2 GB disponibles'
}

// Números animados en la sección de stats
export const STATS = [
  { value: 500, suffix: '+', labelKey: 'testers' },
  { value: 15,  suffix: '+', labelKey: 'planets' },
  // ...
]
```

### `src/constants/i18n.js`

Ahí están todos los textos de la web organizados por idioma. Cada locale tiene la misma estructura. Si querés cambiar algún texto (el tagline del hero, la descripción de una feature, el footer, etc.) lo editás directamente ahí.

La clave `meta.title` y `meta.description` controlan el título de la pestaña del browser y el meta description, y cambian automáticamente cuando el usuario cambia el idioma.

---

## Agregar capturas de pantalla

1. Ponés las imágenes en `public/assets/screenshots/`
2. En `config.js` agregás los objetos en el array `SCREENSHOTS`:
   ```js
   { src: './assets/screenshots/mi-imagen.jpg', alt: 'texto accesible', title: 'Título visible al hover' }
   ```
3. Hacés build y listo, aparecen en la galería con lightbox incluido.

Si el array está vacío se muestran placeholders automáticamente.

---

## El .exe

El archivo de descarga tiene que estar en `public/assets/` con el mismo nombre que tenés en `DOWNLOAD_URL`. Al hacer build Vite copia todo lo que está en `public/` directo a `dist/`.

---

## Cómo correr esto

```bash
npm install       # primera vez
npm run dev       # desarrollo
npm run build     # build de producción
npm run preview   # probar el build antes de subir
```

Para subirlo a producción mirá [deploy.md](./deploy.md).

---

## Stack

- Vue 3 (Composition API, `<script setup>`)
- Vite 6
- CSS puro (sin Tailwind ni librerías de UI)
- Sin router, sin Pinia, sin nada extra
