<script setup>
import { inject, ref, onMounted } from 'vue'

const t = inject('t')
const setAnnouncementVisible = inject('setAnnouncementVisible')

const STORAGE_KEY = 'scm_announcement_dismissed'

const dismiss = () => {
  localStorage.setItem(STORAGE_KEY, '1')
  setAnnouncementVisible(false)
}

onMounted(() => {
  if (localStorage.getItem(STORAGE_KEY) === '1') {
    setAnnouncementVisible(false)
  }
})
</script>

<template>
  <div class="announcement-bar" role="banner">
    <div class="announcement-inner">
      <span class="announcement-rocket" aria-hidden="true">🚀</span>
      <p class="announcement-text">{{ t.announcement.text }}</p>
      <button class="dismiss-btn" @click="dismiss" :aria-label="t.announcement.dismiss">
        {{ t.announcement.dismiss }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.announcement-bar {
  background: linear-gradient(90deg, var(--accent) 0%, #5048d4 40%, var(--glow) 100%);
  position: relative;
  z-index: 101;
  animation: slide-down 0.5s ease both;
}

.announcement-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
}

.announcement-rocket {
  font-size: 1rem;
  flex-shrink: 0;
}

.announcement-text {
  font-size: 0.82rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.03em;
  text-align: center;
}

.dismiss-btn {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  padding: 4px 8px;
  border-radius: 4px;
  transition: color var(--transition-fast), background var(--transition-fast);
  line-height: 1;
}

.dismiss-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
}

@media (max-width: 480px) {
  .announcement-text {
    font-size: 0.75rem;
    padding-right: 32px;
  }
}
</style>
