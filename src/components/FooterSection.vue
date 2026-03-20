<script setup>
import { inject, computed } from 'vue'
import { SOCIAL_LINKS, GAME_NAME } from '../constants/config.js'

const t = inject('t')
const interpolate = inject('interpolate')

const currentYear = new Date().getFullYear()
const copyText = computed(() => interpolate(t.value.footer.copy, { year: currentYear }))

const activeSocialLinks = computed(() =>
  Object.entries(SOCIAL_LINKS).filter(([, url]) => url.length > 0)
)
</script>

<template>
  <footer class="footer">
    <div class="footer-glow" aria-hidden="true"></div>

    <div class="footer-top">
      <div class="footer-top-inner">
        <div class="footer-brand">
          <img :src="'./assets/logo.png'" alt="Space Cadet Mining" width="44" height="44" class="footer-logo" />
          <div class="footer-brand-text">
            <span class="footer-name">{{ GAME_NAME }}</span>
            <span class="footer-tagline">{{ t.footer.tagline }}</span>
          </div>
        </div>

        <nav v-if="activeSocialLinks.length > 0" class="social-links" aria-label="Social links">
          <a
            v-for="[platform, url] in activeSocialLinks"
            :key="platform"
            :href="url"
            rel="noopener noreferrer"
            target="_blank"
            class="social-link"
          >{{ platform }}</a>
        </nav>
      </div>
    </div>

    <div class="footer-divider" aria-hidden="true"></div>

    <div class="footer-bottom">
      <p class="footer-copy">{{ copyText }}</p>
      <div class="footer-badges">
        <span class="footer-badge">Vite</span>
        <span class="footer-badge">Vue 3</span>
        <span class="footer-badge">Beta v{{ '0.4.2' }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-secondary);
  position: relative;
  overflow: hidden;
}

.footer-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-dim), var(--glow-dim), transparent);
  pointer-events: none;
}

.footer-glow::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 60px;
  background: radial-gradient(ellipse at top, rgba(108, 99, 255, 0.08) 0%, transparent 70%);
  filter: blur(12px);
}

.footer-top {
  padding: 52px 24px 40px;
}

.footer-top-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.footer-logo {
  border-radius: 10px;
  object-fit: contain;
  opacity: 0.85;
}

.footer-brand-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.footer-name {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.05em;
}

.footer-tagline {
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.03em;
}

.social-links {
  display: flex;
  gap: 8px;
}

.social-link {
  padding: 8px 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: capitalize;
  transition: border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
}

.social-link:hover {
  border-color: var(--border-accent);
  color: var(--accent-bright);
  background: var(--accent-dim);
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-glass) 20%, var(--border-glass) 80%, transparent);
  margin: 0 24px;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.footer-copy {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.footer-badges {
  display: flex;
  gap: 8px;
}

.footer-badge {
  padding: 3px 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  font-size: 0.68rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  font-family: var(--font-display);
}

@media (max-width: 640px) {
  .footer-top-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
