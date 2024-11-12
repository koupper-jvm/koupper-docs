<script setup>
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { page, frontmatter } = useData()
const isDarkMode = ref(false)

// Función para alternar el modo nocturno
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

// Verifica el estado inicial al cargar la página
onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark')
  document.documentElement.classList.toggle('dark', isDarkMode.value)
})
</script>

<template>
  <nav class="custom-navbar">
    <div>
      <a href="/">Inicio</a>
    </div>
    <button @click="toggleDarkMode">
      {{ isDarkMode ? 'Modo Claro' : 'Modo Nocturno' }}
    </button>
  </nav>

  <h1>{{ frontmatter.value?.title }}</h1>

  <div v-if="page.isNotFound">
    Custom 404 page!
  </div>

  <div v-else-if="frontmatter.value?.layout === 'home'">
    <h2 class="home-title">Bienvenido a la página de inicio</h2>
    <p class="home-description">Este es el contenido personalizado de la página de inicio.</p>
  </div>

  <!-- Aquí se renderiza el contenido Markdown -->
  <Content v-else />
</template>

<style scoped>
.custom-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--vp-c-bg, #fff);
  border-bottom: 1px solid var(--vp-c-border, #eaecef);
}

button {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: none;
  background-color: var(--vp-c-primary, #007acc);
  color: #fff;
  border-radius: 5px;
}

.dark .custom-navbar {
  background-color: #333;
  color: #fff;
}

.dark button {
  background-color: #444;
  color: #fff;
}

.home-title {
  font-size: 2rem;
  color: #007acc;
  font-weight: bold;
}

.home-description {
  font-size: 1.2rem;
  color: #333;
  margin-top: 10px;
}
</style>
