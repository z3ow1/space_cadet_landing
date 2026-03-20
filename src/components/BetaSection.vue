<script setup>
import { inject, ref, computed } from 'vue'
import { DOWNLOAD_URL, GAME_VERSION, RELEASE_DATE, SYSTEM_REQUIREMENTS } from '../constants/config.js'
import { useIntersect } from '../composables/useIntersect.js'

const t = inject('t')
const sectionEl = ref(null)
const { visible } = useIntersect(sectionEl, 0.1)

const reqEntries = computed(() => Object.entries(SYSTEM_REQUIREMENTS))

const onCardTilt = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
  card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`
}

const onCardReset = (e) => {
  e.currentTarget.style.transform = ''
}
</script>

<template>
  <section id="beta" ref="sectionEl" :class="['beta-section', 'reveal', { visible }]">
    <div class="beta-grid">
      <div class="beta-left">
        <span class="version-badge">{{ t.beta.badge }}</span>
        <h2 class="beta-title gradient-text">{{ t.beta.title }}</h2>
        <p class="beta-callout">{{ t.beta.callout }}</p>

        <div class="requirements-box">
          <h3 class="req-title">{{ t.beta.reqTitle }}</h3>
          <ul class="req-list">
            <li v-for="[key, val] in reqEntries" :key="key" class="req-item">
              <span class="req-key">{{ key }}</span>
              <span class="req-val">{{ val }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="beta-right">
        <div class="download-card" @mousemove="onCardTilt" @mouseleave="onCardReset">
          <div class="download-card-header">
            <span class="version-number">v{{ GAME_VERSION }}</span>
            <span class="platform-tag">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M0 2.3L6.5 1.4v6.1H0V2.3zm7.2-.9L16 0v7.5H7.2V1.4zM0 8.2h6.5v6.1L0 13.4V8.2zm7.2 0H16V16L7.2 14.9V8.2z"/>
              </svg>
              Windows
            </span>
          </div>

          <a :href="DOWNLOAD_URL" class="btn-download btn-download-hero" download>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M11 3v12m0 0l-5-5m5 5l5-5M3 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ t.nav.download }}
          </a>

          <div class="download-meta">
            <div class="meta-row">
              <span class="meta-k">{{ t.beta.version }}</span>
              <span class="meta-v">{{ GAME_VERSION }}</span>
            </div>
            <div class="meta-divider"></div>
            <div class="meta-row">
              <span class="meta-k">{{ t.beta.releaseDate }}</span>
              <span class="meta-v">{{ RELEASE_DATE }}</span>
            </div>
            <div class="meta-divider"></div>
            <div class="meta-row">
              <span class="meta-k">{{ t.beta.platform }}</span>
              <span class="meta-v">Windows 10/11</span>
            </div>
          </div>

          <div class="free-badge">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1l1.5 4H13l-3.5 2.5L11 12 7 9.5 3 12l1.5-4.5L1 5h4.5L7 1z" fill="var(--glow)" stroke="var(--glow)" stroke-width="0.5" stroke-linejoin="round"/>
            </svg>
            Free Beta Access
          </div>
        </div>
      </div>
    </div>

    <div class="beta-grid-bg" aria-hidden="true"></div>
  </section>
</template>

<style scoped>
.beta-section {
  position: relative;
  max-width: none;
  padding: 100px 24px;
  overflow: hidden;
}

.beta-grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(135deg, rgba(108, 99, 255, 0.04) 0%, rgba(0, 212, 255, 0.02) 100%),
    repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255, 255, 255, 0.015) 40px, rgba(255, 255, 255, 0.015) 41px),
    repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255, 255, 255, 0.015) 40px, rgba(255, 255, 255, 0.015) 41px);
  pointer-events: none;
  z-index: 0;
}

.beta-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 48px;
  align-items: start;
  position: relative;
  z-index: 1;
}

.beta-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.version-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 16px;
  background: rgba(0, 212, 255, 0.08);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: var(--radius-pill);
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--glow);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  width: fit-content;
}

.beta-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.02em;
}

.beta-callout {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.75;
  max-width: 480px;
}

.requirements-box {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-glass);
  border-radius: 12px;
  padding: 24px;
}

.req-title {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--accent-bright);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.req-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.req-item {
  display: grid;
  grid-template-columns: 90px 1fr;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
}

.req-key {
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
}

.req-val {
  color: var(--text-secondary);
}

.beta-right {
  position: sticky;
  top: 100px;
}

.download-card {
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: 20px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  backdrop-filter: blur(12px);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.3s ease;
}

.download-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--glow));
}

.download-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.version-number {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.08em;
}

.platform-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
}

.btn-download-hero {
  width: 100%;
  justify-content: center;
  padding: 18px 24px;
  font-size: 1rem;
}

.download-meta {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.meta-divider {
  height: 1px;
  background: var(--border-glass);
}

.meta-k {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.meta-v {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  font-family: var(--font-display);
}

.free-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--glow);
  letter-spacing: 0.06em;
}

@media (max-width: 900px) {
  .beta-grid {
    grid-template-columns: 1fr;
  }

  .beta-right {
    position: static;
  }
}
</style>
