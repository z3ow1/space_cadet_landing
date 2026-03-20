<script setup>
import { inject, ref, watch } from 'vue'
import { STATS } from '../constants/config.js'
import { useIntersect } from '../composables/useIntersect.js'

const t = inject('t')
const wrapperEl = ref(null)
const { visible } = useIntersect(wrapperEl, 0.2)

const counts = ref(STATS.map(() => 0))
let animated = false

const animateCount = (index, target, duration = 1600) => {
  const start = Date.now()
  const tick = () => {
    const elapsed = Date.now() - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    counts.value[index] = Math.floor(eased * target)
    if (progress < 1) requestAnimationFrame(tick)
    else counts.value[index] = target
  }
  requestAnimationFrame(tick)
}

watch(visible, (val) => {
  if (val && !animated) {
    animated = true
    STATS.forEach((stat, i) => {
      setTimeout(() => animateCount(i, stat.value), i * 120)
    })
  }
})
</script>

<template>
  <div ref="wrapperEl" class="stats-wrapper" :class="{ visible }">
    <div class="stats-inner">
      <div
        v-for="(stat, i) in STATS"
        :key="i"
        class="stat-item"
        :class="[`reveal-delay-${i + 1}`, { visible }]"
      >
        <div class="stat-orbit-wrap" aria-hidden="true">
          <div class="stat-orbit stat-orbit-1"></div>
          <div class="stat-orbit stat-orbit-2"></div>
        </div>
        <div class="stat-number">
          <span class="stat-value">{{ counts[i] }}</span>
          <span class="stat-suffix">{{ stat.suffix }}</span>
        </div>
        <div class="stat-label">{{ t.stats[stat.labelKey] }}</div>
        <div class="stat-line" aria-hidden="true"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-wrapper {
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.stats-wrapper.visible {
  opacity: 1;
  transform: none;
}

.stats-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-accent), transparent);
}

.stats-wrapper::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-glass), transparent);
}

.stats-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 64px 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 16px;
  position: relative;
}

.stat-orbit-wrap {
  position: absolute;
  width: 90px;
  height: 90px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  pointer-events: none;
}

.stat-orbit {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid;
}

.stat-orbit-1 {
  border-color: rgba(108, 99, 255, 0.18);
  animation: spin-slow 8s linear infinite;
}

.stat-orbit-2 {
  inset: 10px;
  border-color: rgba(0, 212, 255, 0.12);
  animation: spin-slow 14s linear infinite reverse;
}

.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 20%;
  height: 60%;
  width: 1px;
  background: var(--border-glass);
}

.stat-number {
  display: flex;
  align-items: baseline;
  gap: 2px;
  margin-bottom: 8px;
}

.stat-value {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: transparent;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-bright) 60%, var(--glow) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: counter-glow 3s ease-in-out infinite;
  line-height: 1;
}

.stat-suffix {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--accent-bright);
  -webkit-text-fill-color: var(--accent-bright);
}

.stat-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.stat-line {
  width: 24px;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--glow));
  border-radius: 2px;
  margin-top: 12px;
}

@media (max-width: 640px) {
  .stats-inner {
    grid-template-columns: repeat(2, 1fr);
    padding: 48px 16px;
  }

  .stat-item:nth-child(2)::after {
    display: none;
  }

  .stat-item:nth-child(1),
  .stat-item:nth-child(2) {
    border-bottom: 1px solid var(--border-glass);
    padding-bottom: 32px;
    margin-bottom: 0;
  }

  .stat-item:nth-child(3),
  .stat-item:nth-child(4) {
    padding-top: 32px;
  }
}

@media (max-width: 380px) {
  .stats-inner {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
