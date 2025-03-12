<template>
  <nav class="navbar navbar-expand-lg fixed-top custom-navbar">
    <div class="container">
      <!-- Nombre del portfolio -->
      <a class="navbar-brand" href="#">Manel Ferrer</a>

      <!-- Botón menú hamburguesa -->
      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <div class="hamburger" :class="{ open: isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <!-- Menú de escritorio -->
      <div class="collapse navbar-collapse d-lg-flex justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="(section, key) in sections" :key="key">
            <a class="nav-link" :class="{ active: activeSection === key }" href="#" @click.prevent="scrollTo(key)">
              {{ section }}
            </a>
          </li>
        </ul>

        <!-- Idiomas en la derecha -->
        <div class="language-buttons d-none d-lg-flex">
          <button v-for="(label, code) in languages" :key="code" class="btn btn-language"
            :class="{ 'active-lang': currentLanguage === code }" @click.prevent="changeLanguage(code)">
            {{ label }}
          </button>
        </div>
      </div>

      <!-- Menú móvil con animación -->
      <transition name="slide-fade">
        <div v-if="isMenuOpen" class="mobile-menu">
          <ul class="navbar-nav">
            <li class="nav-item" v-for="(section, key) in sections" :key="key">
              <a class="nav-link" :class="{ active: activeSection === key }" href="#" @click.prevent="scrollTo(key)">
                {{ section }}
              </a>
            </li>
          </ul>

          <!-- Botones de idioma en móvil -->
          <div class="language-buttons d-flex justify-content-center">
            <button v-for="(label, code) in languages" :key="code" class="btn btn-language"
              :class="{ 'active-lang': currentLanguage === code }" @click.prevent="changeLanguage(code)">
              {{ label }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
import { ref, inject, computed, onMounted, onUnmounted } from 'vue';
import { translations } from '../translations';

export default {
  setup() {
    const currentLanguage = inject('currentLanguage');
    const activeSection = ref('home');
    const isMenuOpen = ref(false);

    const languages = {
      es: "Español",
      cat: "Català",
      en: "English"
    };

    const sections = computed(() => translations[currentLanguage.value].menu);

    const changeLanguage = (lang) => {
      currentLanguage.value = lang;
    };

    const scrollTo = (section) => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      isMenuOpen.value = false;
    };

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const updateActiveSection = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSection = section.id;
        }
      });

      activeSection.value = currentSection;
    };

    onMounted(() => {
      window.addEventListener("scroll", updateActiveSection);
      updateActiveSection();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", updateActiveSection);
    });

    return { languages, currentLanguage, sections, activeSection, isMenuOpen, changeLanguage, scrollTo, toggleMenu };
  }
};
</script>

<style scoped>
/* NAVBAR */
.custom-navbar {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 10px 0;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}

/* NAV LINK */
.navbar-nav .nav-link {
  color: #fff;
  padding: 10px 15px;
  position: relative;
  transition: color 0.3s;
}

.navbar-nav .nav-link::after {
  content: '';
  display: block;
  height: 2px;
  width: 0;
  background: #50fa7b;
  transition: width 0.3s;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.navbar-nav .nav-link:hover::after,
.navbar-nav .nav-link.active::after {
  width: 100%;
}

.navbar-nav .nav-link:hover,
.navbar-nav .nav-link.active {
  color: #50fa7b;
}

/* BOTÓN HAMBURGUESA */
.navbar-toggler {
  border: none;
  background: none;
  padding: 0;
}

.hamburger {
  width: 30px;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.hamburger span {
  background: white;
  height: 3px;
  width: 100%;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* MENÚ MÓVIL */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

/* ANIMACIÓN DEL MENÚ */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-in-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-15px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

/* BOTONES DE IDIOMA */
.language-buttons {
  display: flex;
  gap: 10px;
}

.btn-language {
  background: transparent;
  color: white;
  border: 2px solid #50fa7b;
  padding: 8px 15px;
  border-radius: 5px;
  transition: background 0.3s, color 0.3s;
}

.btn-language:hover,
.btn-language.active-lang {
  background: #50fa7b;
  color: black;
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .mobile-menu .language-buttons {
    flex-direction: row;
  }
}
</style>
