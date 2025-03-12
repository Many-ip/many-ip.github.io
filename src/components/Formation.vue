<template>
  <section id="formation" class="full-screen">
    <h1>{{ translations[currentLanguage].formation.title }}</h1>
    <p>{{ translations[currentLanguage].formation.description }}</p>
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
  background-color: #d1e7dd; /* Verde claro */
}
</style>
