import { ref } from 'vue'

const toastMessage = ref('')
const toastVisible = ref(false)

export function useClipboard() {
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    toastMessage.value = '✅ 已複製！可以貼到 Gemini 了'
    toastVisible.value = true
    setTimeout(() => { toastVisible.value = false }, 2500)
  }

  return { copyText, toastMessage, toastVisible }
}
