# Space Cadet Mining Deploy

## Comandos diarios

```bash
npm run dev          # desarrollo local con hot reload
npm run build        # genera dist/ listo para subir
npm run preview      # prueba el build en localhost:4173 (requisito : usa primero npm run build)
```

---

## Subir el proyecto a GitHub

Primero creás el repo en github.com (botón "New repository"), lo dejás vacío, sin README ni .gitignore. Después desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

Para los siguientes cambios ya es solo:
```bash
git add .
git commit -m "lo que cambiaste"
git push
```

---

## Vercel la opción más fácil

Gratis para proyectos personales, deploya automáticamente cada vez que hacés push a main.

1. Entrás a vercel.com y te logeás con GitHub
2. "Add New Project" => importás el repo que creaste
3. Framework: **Vite** (lo detecta solo)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy

Listo. Te da una URL tipo `space-cadet-mining.vercel.app`. Cada vez que hagas push a GitHub se redeploya solo.

Si querés dominio propio (opcional, también gratis si tenés uno): Settings => Domains.

---

## Netlify igual de bueno

1. netlify.com => "Add new site" => "Import an existing project" => conectás GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy site

También se redeploya automáticamente con cada push. URL tipo `space-cadet-mining.netlify.app`.

Alternativa sin conectar GitHub, subís el `dist/` a mano arrastrándolo en netlify.com/drop.

---

## GitHub Pages gratuito directo en tu repo

Requiere instalar una herramienta extra para publicar el `dist/`:

```bash
npm install --save-dev gh-pages
```

Agregás este script en `package.json`:
```json
"deploy": "npm run build && gh-pages -d dist"
```

Después:
```bash
npm run deploy
```

Eso pushea el `dist/` a la rama `gh-pages`. En GitHub vas a Settings => Pages => Source: `gh-pages` branch => `/` (root). URL: `TU_USUARIO.github.io/TU_REPO`.

---

## Cloudflare Pages otra buena opción gratuita

Similar a Vercel/Netlify. Ventaja: viene integrado con la red de Cloudflare.

1. dash.cloudflare.com => Workers & Pages => Create application => Pages
2. Conectás el repo de GitHub
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Deploy

URL: `TU_PROYECTO.pages.dev`

---

## DDoS y bots en producción

El sitio ya tiene robots.txt y CSP configurados, pero eso no protege contra ataques de volumen. Para eso necesitás Cloudflare como proxy:

1. Si desplegás en Cloudflare Pages ya viene protegido automáticamente
2. Si usás Vercel/Netlify con dominio propio, apuntás el DNS a través de Cloudflare (free tier) activando el proxy (la nubecita naranja en DNS settings)

Cloudflare free cubre DDoS L3/L4/L7, rate limiting básico y bot challenge sin costo para proyectos chicos.

---

## Recomendación

Para una beta page de un juego indie: **Vercel** es lo más rápido de configurar y lo más confiable. Si en algún momento querés DDoS protection seria, Cloudflare Pages + Cloudflare proxy es la combinación ideal sin pagar nada.
