<script setup>
import { ref, computed, watchEffect, provide } from 'vue'
import { LOCALES, DEFAULT_LOCALE } from './constants/i18n.js'
import { useSecurity } from './composables/useSecurity.js'

useSecurity()
import Navbar from './components/Navbar.vue'
import AnnouncementBar from './components/AnnouncementBar.vue'
import HeroSection from './components/HeroSection.vue'
import StatsSection from './components/StatsSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import ScreenshotsSection from './components/ScreenshotsSection.vue'
import BetaSection from './components/BetaSection.vue'
import FooterSection from './components/FooterSection.vue'

const locale = ref(DEFAULT_LOCALE)
const t = computed(() => LOCALES[locale.value])
const setLocale = (key) => { locale.value = key }
const interpolate = (str, vars) => str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))

const announcementVisible = ref(true)
const setAnnouncementVisible = (val) => { announcementVisible.value = val }

provide('locale', locale)
provide('t', t)
provide('setLocale', setLocale)
provide('interpolate', interpolate)
provide('announcementVisible', announcementVisible)
provide('setAnnouncementVisible', setAnnouncementVisible)

watchEffect(() => {
  document.documentElement.lang = locale.value
  document.title = t.value.meta.title
  const descEl = document.querySelector('meta[name="description"]')
  if (descEl) descEl.setAttribute('content', t.value.meta.description)
})

</script>

<template>
  <div class="aurora-bg" aria-hidden="true">
    <div class="aurora aurora-1"></div>
    <div class="aurora aurora-2"></div>
    <div class="aurora aurora-3"></div>
  </div>

  <div class="scanlines" aria-hidden="true"></div>

  <div class="page-loader" aria-hidden="true">
    <div class="loader-logo-wrap">
      <img :src="'./assets/logo.png'" alt="" width="56" height="56" class="loader-logo-img" />
    </div>
    <div class="loader-bar-track">
      <div class="loader-bar"></div>
    </div>
  </div>

  <div id="app-root">
    <AnnouncementBar v-if="announcementVisible" />
    <Navbar :announcement-visible="announcementVisible" />
    <main>
      <HeroSection />
      <div class="wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,24 C240,48 480,0 720,24 C960,48 1200,0 1440,24 L1440,48 L0,48 Z" fill="var(--bg-secondary)" />
        </svg>
      </div>
      <StatsSection />
      <div class="wave-divider wave-divider-flip" aria-hidden="true">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,24 C240,0 480,48 720,24 C960,0 1200,48 1440,24 L1440,0 L0,0 Z" fill="var(--bg-secondary)" />
        </svg>
      </div>
      <FeaturesSection />
      <ScreenshotsSection />
      <BetaSection />
    </main>
    <FooterSection />
  </div>
</template>

<style>
#app-root {
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
  z-index: 1;
}

.aurora-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.aurora {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  animation: aurora-drift linear infinite;
  will-change: transform;
}

.aurora-1 {
  width: 80vw;
  height: 60vh;
  background: radial-gradient(ellipse, rgba(108, 99, 255, 0.08) 0%, transparent 70%);
  top: -20%;
  left: -10%;
  animation-duration: 25s;
}

.aurora-2 {
  width: 60vw;
  height: 70vh;
  background: radial-gradient(ellipse, rgba(0, 212, 255, 0.05) 0%, transparent 70%);
  bottom: -30%;
  right: -10%;
  animation-duration: 32s;
  animation-direction: reverse;
}

.aurora-3 {
  width: 50vw;
  height: 50vh;
  background: radial-gradient(ellipse, rgba(196, 77, 255, 0.04) 0%, transparent 70%);
  top: 30%;
  left: 30%;
  animation-duration: 18s;
  animation-delay: -8s;
}

.page-loader {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  animation: loader-out 0.5s 1.4s ease forwards;
  pointer-events: none;
}

.loader-logo-wrap {
  animation: loader-logo-pulse 0.8s ease-in-out infinite;
}

.loader-logo-img {
  border-radius: 16px;
  display: block;
}

.loader-bar-track {
  width: 200px;
  height: 2px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
}

.loader-bar {
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--glow));
  border-radius: 2px;
  animation: loader-fill 1.1s 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.wave-divider {
  position: relative;
  z-index: 1;
}

.wave-divider-flip {
  transform: scaleY(-1);
  margin-bottom: -1px;
}
</style>
