import { ref, onMounted, onUnmounted } from 'vue'

export function useIntersect(targetRef, threshold = 0.15) {
  const visible = ref(false)
  let observer

  onMounted(() => {
    if (!targetRef.value) return
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    }, { threshold })
    observer.observe(targetRef.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { visible }
}
