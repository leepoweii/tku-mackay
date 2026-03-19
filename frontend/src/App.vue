<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const current = ref(0)

const pageModules = import.meta.glob('./pages/*.vue', { eager: true })
const sortedPages = Object.entries(pageModules)
  .map(([path, mod]) => ({
    name: path.match(/\/(P\d+\w+)\.vue$/)?.[1] || path,
    component: mod.default
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

const total = computed(() => sortedPages.length)

function prev() {
  if (current.value > 0) current.value--
}

function next() {
  if (current.value < total.value - 1) current.value++
}

function handleKeydown(e) {
  if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault()
    next()
  }
}

let touchStartX = 0
let touchStartY = 0

function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

function handleTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  const dy = e.changedTouches[0].clientY - touchStartY
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx < 0) next()
    else prev()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
})
</script>

<template>
  <div class="app-wrapper">
    <div class="slide-container">
      <transition name="slide-fade" mode="out-in">
        <component
          :is="sortedPages[current]?.component"
          :key="current"
        />
      </transition>
    </div>

    <nav class="nav">
      <button
        class="nav-btn"
        :disabled="current === 0"
        @click="prev"
        aria-label="上一頁"
      >◀</button>
      <span class="nav-counter">{{ current + 1 }} / {{ total }}</span>
      <button
        class="nav-btn"
        :disabled="current === total - 1"
        @click="next"
        aria-label="下一頁"
      >▶</button>
    </nav>
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.slide-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  border-radius: 40px;
  padding: 10px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 100;
  border: 1px solid var(--card-border);
}

.nav-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--accent);
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.nav-btn:hover:not(:disabled) {
  background: var(--light);
}

.nav-btn:disabled {
  color: #ccc;
  cursor: default;
}

.nav-counter {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text);
  min-width: 80px;
  text-align: center;
  font-family: 'Noto Sans TC', sans-serif;
}

/* Slide transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
