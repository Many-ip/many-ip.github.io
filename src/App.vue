<template>
  <NavBar />
  <Home />
  <About />
  <Technologies />

  <button v-show="showScrollTop" class="scroll-top-btn" @click="scrollToTop">
    <i class="bi bi-arrow-up"></i> <!-- Icono de Bootstrap Icons -->
  </button>
</template>

<script>
import { ref, provide, onMounted, onUnmounted, watch } from 'vue';
import NavBar from './components/NavBar.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';
import Technologies from './components/Technologies.vue';
import { translations } from './translations'; 

export default {
  components: { NavBar, Home, About, Technologies },
  setup() {
    const browserLang = navigator.language.startsWith('ca') ? 'cat' :
                        navigator.language.startsWith('en') ? 'en' : 'es';
    const currentLanguage = ref(browserLang);
    provide('currentLanguage', currentLanguage);

    const userName = "Manel Ferrer"; 

    const getTitle = () => `${userName} - ${translations[currentLanguage.value].tab.portfolio}`;
    const getHiddenTitle = () => translations[currentLanguage.value].tab.hidden;

    const handleVisibilityChange = () => {
      document.title = document.hidden ? getHiddenTitle() : getTitle();
    };

    onMounted(() => {
      document.title = getTitle();
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScroll);
    });

    watch(currentLanguage, () => {
      document.title = getTitle();
    });

    // Botón para subir arriba
    const showScrollTop = ref(false);

    const handleScroll = () => {
      showScrollTop.value = window.scrollY > 200;
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return { currentLanguage, showScrollTop, scrollToTop };
  }
};
</script>

<style scoped>
/* Botón flotante para volver arriba */
.scroll-top-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: #50fa7b;
  color: black;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s, transform 0.3s;
}

.scroll-top-btn:hover {
  background: #45e06f;
}

.scroll-top-btn:active {
  transform: scale(0.9);
}

/* Ajustar icono */
.scroll-top-btn i {
  font-size: 24px;
  color: black;
}
</style>
