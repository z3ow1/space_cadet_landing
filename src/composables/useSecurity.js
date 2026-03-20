import { onMounted, onUnmounted } from 'vue'

export function useSecurity() {
  if (!import.meta.env.PROD) return

  if (window.top !== window.self) {
    try { window.top.location.replace(window.location.href) } catch { window.location.href = '/' }
  }

  if (navigator.webdriver) {
    document.documentElement.innerHTML = ''
    return
  }

  const DEVTOOLS_THRESHOLD = 160

  const detectDevTools = () => {
    if (
      window.outerWidth - window.innerWidth > DEVTOOLS_THRESHOLD ||
      window.outerHeight - window.innerHeight > DEVTOOLS_THRESHOLD
    ) {
      document.body.style.display = 'none'
    } else {
      document.body.style.display = ''
    }
  }

  const onKeydown = (e) => {
    if (e.key === 'F12') { e.preventDefault(); return }
    if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'K'].includes(e.key.toUpperCase())) { e.preventDefault(); return }
    if (e.ctrlKey && ['u', 'U', 's', 'S'].includes(e.key)) { e.preventDefault(); return }
  }

  const onContextMenu = (e) => e.preventDefault()

  let timer

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)
    document.addEventListener('contextmenu', onContextMenu)
    timer = setInterval(detectDevTools, 800)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown)
    document.removeEventListener('contextmenu', onContextMenu)
    clearInterval(timer)
  })
}
