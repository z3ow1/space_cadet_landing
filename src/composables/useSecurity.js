import { onMounted, onUnmounted } from 'vue'

export function useSecurity() {
  if (!import.meta.env.PROD) return

  if (window.top !== window.self) {
    try { window.top.location.replace(window.location.href) } catch { window.location.href = '/' }
  }

  if (navigator.webdriver) {
    document.body.style.display = 'none'
    return
  }

  const onKeydown = (e) => {
    if (e.key === 'F12') { e.preventDefault(); return }
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'K'].includes(e.key.toUpperCase())) { e.preventDefault(); return }
    if (e.ctrlKey && ['u', 'U', 's', 'S'].includes(e.key)) { e.preventDefault(); return }
  }

  const onContextMenu = (e) => e.preventDefault()

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)
    document.addEventListener('contextmenu', onContextMenu)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown)
    document.removeEventListener('contextmenu', onContextMenu)
  })
}
