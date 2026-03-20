<script setup>
import { inject, ref, watch, onMounted, onUnmounted } from 'vue'
import { SCREENSHOTS } from '../constants/config.js'
import { useIntersect } from '../composables/useIntersect.js'

const t = inject('t')
const sectionEl = ref(null)
const { visible } = useIntersect(sectionEl, 0.1)

const lightboxOpen = ref(false)
const activeIdx = ref(0)

const openLightbox = (i) => {
  if (SCREENSHOTS.length === 0) return
  activeIdx.value = i
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const prevSlide = () => {
  activeIdx.value = (activeIdx.value - 1 + SCREENSHOTS.length) % SCREENSHOTS.length
}

const nextSlide = () => {
  activeIdx.value = (activeIdx.value + 1) % SCREENSHOTS.length
}

const onKeydown = (e) => {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevSlide()
  if (e.key === 'ArrowRight') nextSlide()
}

let touchStartX = 0
const onTouchStart = (e) => { touchStartX = e.touches[0].clientX }
const onTouchEnd = (e) => {
  const delta = e.changedTouches[0].clientX - touchStartX
  if (delta < -50) nextSlide()
  if (delta > 50) prevSlide()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <section id="screenshots" ref="sectionEl" :class="['screenshots-section', 'reveal', { visible }]">
    <h2 class="section-title gradient-text">{{ t.screenshots.title }}</h2>

    <div class="screenshots-grid">
      <template v-if="SCREENSHOTS.length > 0">
        <button
          v-for="(shot, i) in SCREENSHOTS"
          :key="i"
          class="glass-card screenshot-card"
          @click="openLightbox(i)"
          :aria-label="shot.alt"
        >
          <img :src="shot.src" :alt="shot.alt" loading="lazy" />
          <div class="screenshot-overlay" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="17" stroke="white" stroke-opacity="0.6" stroke-width="1.5"/>
              <path d="M13 18h10M18 13l5 5-5 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div v-if="shot.title" class="screenshot-title">{{ shot.title }}</div>
        </button>
      </template>

      <template v-else>
        <div
          v-for="n in 6"
          :key="n"
          class="glass-card screenshot-placeholder"
          :class="`reveal-delay-${Math.min(n, 5)}`"
        >
          <div class="shimmer-inner" aria-hidden="true"></div>
          <div class="placeholder-content">
            <div class="placeholder-icon" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.3"/>
                <circle cx="14" cy="17" r="3" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.3"/>
                <path d="M4 28l9-8 5 5 5-4 9 7" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.3" stroke-linejoin="round"/>
              </svg>
            </div>
            <span>{{ t.screenshots.comingSoon }}</span>
          </div>
        </div>
      </template>
    </div>

    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="lightbox-overlay"
        role="dialog"
        aria-modal="true"
        @click.self="closeLightbox"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <button class="lightbox-close" @click="closeLightbox" :aria-label="t.screenshots.close">✕</button>

        <button
          v-if="SCREENSHOTS.length > 1"
          class="lightbox-nav lightbox-prev"
          @click="prevSlide"
          aria-label="Previous"
        >‹</button>

        <div class="lightbox-img-wrap">
          <img
            :src="SCREENSHOTS[activeIdx].src"
            :alt="SCREENSHOTS[activeIdx].alt"
            class="lightbox-img"
          />
        </div>

        <button
          v-if="SCREENSHOTS.length > 1"
          class="lightbox-nav lightbox-next"
          @click="nextSlide"
          aria-label="Next"
        >›</button>

        <div v-if="SCREENSHOTS.length > 1" class="lightbox-dots" aria-hidden="true">
          <button
            v-for="(_, i) in SCREENSHOTS"
            :key="i"
            class="lightbox-dot"
            :class="{ active: i === activeIdx }"
            @click="activeIdx = i"
          ></button>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.screenshots-section {
  max-width: 1200px;
  padding: 100px 24px;
}

.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.screenshot-card {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  padding: 0;
  display: block;
  width: 100%;
  transition: transform var(--transition-med), box-shadow var(--transition-med), border-color var(--transition-med);
}

.screenshot-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-med);
  display: block;
}

.screenshot-card:hover img {
  transform: scale(1.06);
}

.screenshot-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-med);
}

.screenshot-overlay svg {
  opacity: 0;
  transform: scale(0.8);
  transition: opacity var(--transition-med), transform var(--transition-med);
}

.screenshot-card:hover .screenshot-overlay {
  background: rgba(0, 0, 0, 0.4);
}

.screenshot-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 14px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
  font-size: 0.78rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.04em;
  transform: translateY(100%);
  transition: transform var(--transition-med);
}

.screenshot-card:hover .screenshot-title {
  transform: translateY(0);
}

.screenshot-card:hover .screenshot-overlay svg {
  opacity: 1;
  transform: scale(1);
}

.screenshot-placeholder {
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-med), box-shadow var(--transition-med), background var(--transition-med), border-color var(--transition-med);
}

.shimmer-inner {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 30%,
    rgba(108, 99, 255, 0.05) 45%,
    rgba(0, 212, 255, 0.04) 50%,
    transparent 65%
  );
  background-size: 200% 100%;
  animation: shimmer 4s linear infinite;
}

.placeholder-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--text-muted);
}

.placeholder-content span {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
}

.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float-up 0.2s ease both;
}

.lightbox-close {
  position: absolute;
  top: 24px;
  right: 28px;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color var(--transition-fast), background var(--transition-fast);
  z-index: 1;
}

.lightbox-close:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.lightbox-img-wrap {
  max-width: min(90vw, 1100px);
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.8);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  color: rgba(255, 255, 255, 0.5);
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color var(--transition-fast), background var(--transition-fast);
  line-height: 1;
}

.lightbox-nav:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.lightbox-prev { left: 20px; }
.lightbox-next { right: 20px; }

.lightbox-dots {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.lightbox-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: background var(--transition-fast), transform var(--transition-fast);
}

.lightbox-dot.active {
  background: var(--accent-bright);
  transform: scale(1.3);
}

@media (max-width: 768px) {
  .screenshots-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .screenshots-grid { grid-template-columns: 1fr; }
  .lightbox-nav { display: none; }
}
</style>
