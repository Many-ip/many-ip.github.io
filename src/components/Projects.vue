<template>
  <section id="projects" class="full-screen">
    <h1>{{ translations[currentLanguage].projects.title }}</h1>
    <p>{{ translations[currentLanguage].projects.description }}</p>
  </section>
</template>

<script>
import { inject } from 'vue';
import { translations } from '../translations';

export default {
  setup() {
    const currentLanguage = inject('currentLanguage');
    return { translations, currentLanguage };
  }
};
</script>

<style scoped>
.full-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f8d7da; /* Rojo claro */
}
</style>
