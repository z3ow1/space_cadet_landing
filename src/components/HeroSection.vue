<script setup>
import { inject, ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { DOWNLOAD_URL, GAME_VERSION, GAME_TAGS } from '../constants/config.js'

const t = inject('t')
const interpolate = inject('interpolate')

const downloadSub = computed(() => interpolate(t.value.hero.downloadSub, { version: GAME_VERSION }))

const starsFar = ref([])
const starsMid = ref([])
const starsNear = ref([])
const debris = ref([])
const mouse = reactive({ x: 0, y: 0 })
const titleLetters = computed(() => 'Space Cadet Mining'.split(''))

const onMouseMove = (e) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 24
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 12
}

const genStars = (count, minSize, maxSize) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * (maxSize - minSize) + minSize,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 6
  }))

onMounted(() => {
  starsFar.value = genStars(120, 0.5, 1.2)
  starsMid.value = genStars(60, 1, 2)
  starsNear.value = genStars(20, 2, 4)

  debris.value = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 3 + 2,
    duration: Math.random() * 22 + 14,
    delay: Math.random() * 18,
    type: i % 3
  }))

  window.addEventListener('mousemove', onMouseMove, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})

const starStyle = (star) => ({
  left: `${star.x}%`,
  top: `${star.y}%`,
  width: `${star.size}px`,
  height: `${star.size}px`,
  animationDuration: `${star.duration}s`,
  animationDelay: `${star.delay}s`
})

const debrisStyle = (p) => ({
  left: `${p.x}%`,
  width: `${p.size}px`,
  height: `${p.size}px`,
  animationDuration: `${p.duration}s`,
  animationDelay: `${p.delay}s`,
  background: p.type === 0 ? 'rgba(108,99,255,0.4)' : p.type === 1 ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.2)'
})
</script>

<template>
  <section id="hero" class="hero-section">
    <div
      class="stars-layer stars-far"
      aria-hidden="true"
      :style="{ transform: `translate(${mouse.x * 0.3}px, ${mouse.y * 0.3}px)` }"
    >
      <div v-for="star in starsFar" :key="star.id" class="star" :style="starStyle(star)"></div>
    </div>
    <div
      class="stars-layer stars-mid"
      aria-hidden="true"
      :style="{ transform: `translate(${mouse.x * 0.6}px, ${mouse.y * 0.6}px)` }"
    >
      <div v-for="star in starsMid" :key="star.id" class="star star-bright" :style="starStyle(star)"></div>
    </div>
    <div
      class="stars-layer stars-near"
      aria-hidden="true"
      :style="{ transform: `translate(${mouse.x * 1.2}px, ${mouse.y * 1.2}px)` }"
    >
      <div v-for="star in starsNear" :key="star.id" class="star star-large" :style="starStyle(star)"></div>
    </div>

    <div class="debris-layer" aria-hidden="true">
      <div
        v-for="p in debris"
        :key="p.id"
        class="debris-particle"
        :class="`debris-type-${p.type}`"
        :style="debrisStyle(p)"
      ></div>
    </div>

    <div class="nebula-bg" aria-hidden="true">
      <div class="nebula nebula-1" :style="{ transform: `translate(${mouse.x * 0.15}px, ${mouse.y * 0.15}px)` }"></div>
      <div class="nebula nebula-2" :style="{ transform: `translate(${-mouse.x * 0.1}px, ${-mouse.y * 0.1}px)` }"></div>
      <div class="nebula nebula-3"></div>
    </div>

    <div class="hero-content">
      <span class="early-access-badge">{{ t.hero.badge }}</span>

      <h1 class="hero-title" aria-label="Space Cadet Mining">
        <span
          v-for="(letter, i) in titleLetters"
          :key="i"
          class="title-letter"
          :style="{ animationDelay: `${i * 0.04}s` }"
        >{{ letter === ' ' ? '\u00A0' : letter }}</span>
      </h1>

      <p class="hero-tagline typewriter">{{ t.hero.tagline }}</p>

      <p class="hero-sub">{{ t.hero.subtagline }}</p>

      <div class="genre-tags" aria-label="Game genres">
        <span v-for="tag in GAME_TAGS" :key="tag" class="genre-tag">{{ tag }}</span>
      </div>

      <div class="hero-cta">
        <a :href="DOWNLOAD_URL" class="btn-download" download>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 2v11m0 0l-4-4m4 4l4-4M3 16h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ t.hero.downloadBtn }}
        </a>
        <a href="#features" class="btn-secondary">
          {{ t.hero.cta2 }}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2l6 6-6 6M2 8h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

      <p class="download-sub">{{ downloadSub }}</p>

      <div class="platform-badge" aria-label="Windows platform">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M0 2.3L6.5 1.4v6.1H0V2.3zm7.2-.9L16 0v7.5H7.2V1.4zM0 8.2h6.5v6.1L0 13.4V8.2zm7.2 0H16V16L7.2 14.9V8.2z"/>
        </svg>
        <span>Windows</span>
      </div>
    </div>

    <div class="scroll-indicator" aria-hidden="true">
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 120px 24px 100px;
  max-width: none;
  margin: 0;
}

.stars-layer {
  position: absolute;
  inset: -5%;
  pointer-events: none;
  transition: transform 0.1s linear;
  will-change: transform;
}

.star {
  position: absolute;
  background: #fff;
  border-radius: 50%;
  animation: twinkle linear infinite;
}

.star-bright {
  background: rgba(200, 210, 255, 0.9);
  box-shadow: 0 0 4px rgba(200, 210, 255, 0.5);
}

.star-large {
  background: rgba(108, 99, 255, 0.6);
  box-shadow: 0 0 6px rgba(108, 99, 255, 0.4);
}

.debris-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.debris-particle {
  position: absolute;
  bottom: -10px;
  border-radius: 50%;
  animation: drift-up linear infinite;
}

.debris-type-1 {
  border-radius: 2px;
}

.debris-type-2 {
  border-radius: 1px;
  transform-origin: center;
}

.nebula-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.nebula {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  transition: transform 0.2s linear;
  will-change: transform;
}

.nebula-1 {
  width: 700px;
  height: 700px;
  background: var(--accent);
  opacity: 0.1;
  top: -250px;
  right: -150px;
}

.nebula-2 {
  width: 500px;
  height: 500px;
  background: var(--glow);
  opacity: 0.08;
  bottom: -150px;
  left: -100px;
}

.nebula-3 {
  width: 350px;
  height: 350px;
  background: #c44dff;
  opacity: 0.05;
  top: 30%;
  left: 55%;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.early-access-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 20px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.4);
  border-radius: var(--radius-pill);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--glow);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 28px;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.15);
  animation: float-up 0.5s ease both;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 7vw, 5.5rem);
  font-weight: 900;
  letter-spacing: 0.03em;
  line-height: 1.05;
  margin-bottom: 24px;
  background: linear-gradient(90deg, #ffffff 0%, var(--accent-bright) 30%, var(--glow) 60%, var(--accent-bright) 80%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: gradient-shift 6s linear infinite;
}

.title-letter {
  display: inline-block;
  animation: letter-reveal 0.5s ease both;
}

.hero-tagline {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  color: var(--glow);
  font-weight: 600;
  letter-spacing: 0.06em;
  margin-bottom: 16px;
  text-shadow: 0 0 24px rgba(0, 212, 255, 0.5);
}

.typewriter {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid var(--glow);
  max-width: fit-content;
  animation:
    typing 1.6s steps(28, end) 0.9s both,
    blink-cursor 0.75s step-end 0.9s infinite;
}

.hero-sub {
  font-size: clamp(0.9rem, 1.8vw, 1.05rem);
  color: var(--text-secondary);
  max-width: 540px;
  margin-bottom: 28px;
  line-height: 1.75;
  animation: float-up 0.6s 0.5s ease both;
}

.genre-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 40px;
  animation: float-up 0.6s 0.6s ease both;
}

.genre-tag {
  padding: 4px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  transition: border-color var(--transition-fast), color var(--transition-fast);
}

.genre-tag:hover {
  border-color: var(--border-accent);
  color: var(--text-secondary);
}

.hero-cta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  animation: float-up 0.6s 0.7s ease both;
}

.download-sub {
  font-size: 0.78rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  margin-bottom: 16px;
  animation: float-up 0.6s 0.8s ease both;
}

.platform-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--text-muted);
  animation: float-up 0.6s 0.9s ease both;
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.scroll-line {
  width: 1px;
  height: 52px;
  background: linear-gradient(to bottom, transparent, var(--accent), transparent);
  animation: scroll-bounce 2.2s ease-in-out infinite;
}

@keyframes scroll-bounce {
  0%, 100% { opacity: 0.3; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.4); }
}

@media (max-width: 640px) {
  .hero-cta { flex-direction: column; }
  .btn-download, .btn-secondary { width: 100%; justify-content: center; }
  .hero-title { font-size: clamp(2.2rem, 9vw, 3rem); }
  .typewriter { white-space: normal; overflow: visible; border-right: none; animation: float-up 0.6s 0.3s ease both; }
}
</style>
