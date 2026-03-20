<script setup>
import { inject, ref, onMounted, onUnmounted } from 'vue'
import { LOCALES, LOCALE_KEYS } from '../constants/i18n.js'
import { DOWNLOAD_URL } from '../constants/config.js'

const props = defineProps({ announcementVisible: Boolean })

const locale = inject('locale')
const t = inject('t')
const setLocale = inject('setLocale')

const dropdownOpen = ref(false)
const menuOpen = ref(false)
const scrolled = ref(false)
const progress = ref(0)
const navRef = ref(null)

const toggleDropdown = () => { dropdownOpen.value = !dropdownOpen.value }
const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }

const selectLocale = (key) => {
  setLocale(key)
  dropdownOpen.value = false
}

const onScroll = () => {
  scrolled.value = window.scrollY > 50
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? (window.scrollY / max) * 100 : 0
  if (menuOpen.value) menuOpen.value = false
}

const onClickOutside = (e) => {
  if (navRef.value && !navRef.value.contains(e.target)) {
    dropdownOpen.value = false
    menuOpen.value = false
  }
}

const activeSection = ref('')
let sectionObs = null

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onClickOutside)

  const ids = ['features', 'screenshots', 'beta']
  sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) activeSection.value = e.target.id })
  }, { threshold: 0.4 })
  ids.forEach(id => { const el = document.getElementById(id); if (el) sectionObs.observe(el) })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onClickOutside)
  if (sectionObs) sectionObs.disconnect()
})
</script>

<template>
  <nav ref="navRef" :class="['navbar', { scrolled }]">
    <div class="progress-bar" :style="{ width: progress + '%' }" aria-hidden="true"></div>
    <div class="nav-inner">
      <div class="nav-brand">
        <img :src="'./assets/logo.png'" alt="Space Cadet Mining logo" width="36" height="36" class="brand-logo" />
        <span class="brand-name">Space Cadet Mining</span>
      </div>

      <div :class="['nav-links', { open: menuOpen }]">
        <a href="#features" :class="{ active: activeSection === 'features' }" @click="closeMenu">{{ t.nav.features }}</a>
        <a href="#screenshots" :class="{ active: activeSection === 'screenshots' }" @click="closeMenu">{{ t.nav.screenshots }}</a>
        <a href="#beta" :class="{ active: activeSection === 'beta' }" @click="closeMenu">{{ t.nav.beta }}</a>
      </div>

      <div class="nav-actions">
        <div class="lang-switcher">
          <button class="lang-btn" @click.stop="toggleDropdown" :aria-expanded="dropdownOpen">
            <span class="lang-code">{{ locale }}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" :style="{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }">
              <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <ul v-if="dropdownOpen" class="lang-menu">
            <li v-for="key in LOCALE_KEYS" :key="key">
              <button class="lang-option" :class="{ active: locale === key }" @click="selectLocale(key)">
                {{ LOCALES[key].label }}
              </button>
            </li>
          </ul>
        </div>

        <a :href="DOWNLOAD_URL" class="btn-download btn-download-sm" download>
          {{ t.nav.download }}
        </a>

        <button class="nav-burger" @click.stop="toggleMenu" :aria-expanded="menuOpen" :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'">
          <span class="burger-icon">{{ menuOpen ? '✕' : '☰' }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(10, 10, 15, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  transition: background var(--transition-med), border-color var(--transition-med);
}

.navbar.scrolled {
  background: rgba(10, 10, 15, 0.94);
  border-bottom-color: var(--border-glass);
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--glow));
  transition: width 0.1s linear;
  pointer-events: none;
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 68px;
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.brand-logo {
  border-radius: 8px;
  object-fit: contain;
}

.brand-name {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  flex: 1;
  justify-content: center;
}

.nav-links a {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transition: transform var(--transition-fast);
}

.nav-links a:hover {
  color: var(--text-primary);
}

.nav-links a:hover::after,
.nav-links a.active::after {
  transform: scaleX(1);
}

.nav-links a.active {
  color: var(--text-primary);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.lang-switcher {
  position: relative;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: border-color var(--transition-fast), color var(--transition-fast);
}

.lang-btn:hover {
  border-color: var(--border-accent);
  color: var(--text-primary);
}

.lang-code {
  font-family: var(--font-display);
}

.lang-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: rgba(12, 12, 22, 0.98);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  padding: 6px;
  list-style: none;
  min-width: 150px;
  backdrop-filter: blur(20px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7);
  z-index: 200;
}

.lang-option {
  display: block;
  width: 100%;
  padding: 9px 14px;
  text-align: left;
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--text-secondary);
  transition: background var(--transition-fast), color var(--transition-fast);
}

.lang-option:hover {
  background: var(--accent-dim);
  color: var(--text-primary);
}

.lang-option.active {
  color: var(--accent-bright);
  background: var(--accent-dim);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 68px;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 4px;
    padding: 12px 16px 16px;
    background: rgba(10, 10, 15, 0.98);
    border-bottom: 1px solid var(--border-glass);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links a {
    padding: 12px 8px;
    font-size: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .nav-links a:last-child {
    border-bottom: none;
  }

  .nav-burger {
    display: flex;
  }

  .brand-name { font-size: 0.8rem; }
}

.nav-burger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 1.1rem;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.nav-burger:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-primary);
}

@media (max-width: 480px) {
  .btn-download-sm {
    padding: 8px 14px;
    font-size: 0.75rem;
  }
}
</style>
