<script setup>
import { inject, ref } from 'vue'
import { useIntersect } from '../composables/useIntersect.js'

const t = inject('t')
const sectionEl = ref(null)
const { visible } = useIntersect(sectionEl, 0.1)

const iconAnimations = ['float', 'mine-shake', 'spin-slow', 'wiggle', 'float', 'mine-shake']

const onCardMouseMove = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18
  card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) translateY(-6px)`
  card.style.boxShadow = `${-x * 0.5}px ${y * 0.5}px 40px rgba(108,99,255,0.2)`
}

const onCardMouseLeave = (e) => {
  const card = e.currentTarget
  card.style.transform = ''
  card.style.boxShadow = ''
}
</script>

<template>
  <section id="features" ref="sectionEl" :class="['features-section', 'reveal', { visible }]">
    <div class="section-header">
      <h2 class="section-title gradient-text">{{ t.features.title }}</h2>
    </div>

    <div class="features-grid">
      <div
        v-for="(feature, i) in t.features.items"
        :key="i"
        class="feature-card glass-card"
        :class="`reveal-delay-${i + 1}`"
        @mousemove="onCardMouseMove"
        @mouseleave="onCardMouseLeave"
      >
        <div class="feature-bg-number" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</div>

        <div class="feature-top">
          <div
            class="feature-icon"
            :style="{ animationName: iconAnimations[i], animationDuration: i % 2 === 0 ? '3s' : '2s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite' }"
            aria-hidden="true"
          >{{ feature.icon }}</div>
          <div class="feature-accent-line" aria-hidden="true"></div>
        </div>

        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-desc">{{ feature.desc }}</p>

        <div class="feature-progress" aria-hidden="true">
          <div class="feature-progress-bar" :style="{ width: `${60 + i * 7}%` }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  max-width: 1200px;
  padding: 100px 24px;
}

.section-header {
  margin-bottom: 56px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feature-card {
  padding: 36px 28px 28px;
  transition: box-shadow var(--transition-med), background var(--transition-med), border-color var(--transition-med);
  cursor: default;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0;
  transform-style: preserve-3d;
  will-change: transform;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), var(--glow), transparent);
  opacity: 0;
  transition: opacity var(--transition-med);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-bg-number {
  position: absolute;
  top: 12px;
  right: 16px;
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 900;
  color: var(--text-primary);
  opacity: 0.04;
  line-height: 1;
  transition: opacity var(--transition-med), transform var(--transition-med);
  user-select: none;
  pointer-events: none;
  letter-spacing: -0.02em;
}

.feature-card:hover .feature-bg-number {
  opacity: 0.12;
  transform: scale(1.1) translateY(-4px);
}

.feature-top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.feature-icon {
  font-size: 2.6rem;
  line-height: 1;
  display: block;
  flex-shrink: 0;
  filter: drop-shadow(0 0 8px rgba(108, 99, 255, 0.3));
}

.feature-accent-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--border-accent), transparent);
}

.feature-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.04em;
  margin-bottom: 10px;
  line-height: 1.4;
}

.feature-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.75;
  flex: 1;
  margin-bottom: 20px;
}

.feature-progress {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
  margin-top: auto;
}

.feature-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--glow));
  border-radius: 2px;
  transition: width 1s ease;
}

@media (max-width: 900px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 580px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
