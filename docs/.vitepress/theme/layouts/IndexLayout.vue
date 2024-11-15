<script setup>
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { page, frontmatter } = useData()
const isDarkMode = ref(false)

function toggleDarkMode() {
  // Cambia el estado de isDarkMode y sincroniza la clase 'dark'
  document.documentElement.classList.toggle('dark', isDarkMode.value);
}

// Verifica el estado inicial al cargar la página
onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark')
  // Asegúrate de que la clase 'dark' se sincronice al cargar
  document.documentElement.classList.toggle('dark', isDarkMode.value)
})
</script>

<template>
  <nav class="custom-navbar">
    <div>
      <img src="/koupper-logo.svg" alt="">
    </div>
    <label class="switch">
      <!-- Usamos v-model para sincronizar el estado del checkbox con isDarkMode -->
      <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode">
      <span class="slider"></span>
    </label>
  </nav>
  <div v-if="page.isNotFound">
    Custom 404 page!
  </div>
  <div v-if="frontmatter.layout === 'home'">
    <div class="container">
      <Content />
    </div>
  </div>
  <Content v-else />
</template>

<style scoped>
.custom-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--vp-c-bg, #fff);
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e1dfdf;
  border-radius: 34px;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: '\2600'; /* Inicialmente el ícono será el sol */
  font-size: 18px;
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: rgb(253, 255, 244); /* Color negro por defecto */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .4s;
  color: rgb(237, 156, 25); /* Color amarillo para el ícono de sol */
}

input:checked + .slider {
  background-color: #2c2c32;
}

input:checked + .slider:before {
  transform: translateX(26px); /* Desplazar el ícono */
  content: '\1F319'; /* Cambiar a la luna (ícono) */
  background-color: rgb(0, 0, 0); /* Color blanco cuando está activado */
}

/* Estilos para el modo oscuro */
.dark .custom-navbar {
  background-color: #1b1b1f;
  color: #fff;
}

.dark .slider {
  background-color: #444;
}
</style>
