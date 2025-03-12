<template>
  <section id="about" class="full-screen about-container">
    <div class="container">
      <h2 class="section-title">{{ translations[currentLanguage].about.title }}</h2>
      <div class="about-content">
        <p class="about-text">{{ translations[currentLanguage].about.description1 }}</p>
        <p class="about-text">{{ translations[currentLanguage].about.description2 }}</p>
        <p class="about-text">{{ translations[currentLanguage].about.description3 }}</p>
      </div>
      <div class="linkedin-button">
        <a href="https://www.linkedin.com/in/manel-ferrer-791192166/" target="_blank" class="btn-linkedin">
          <span class="text">LinkedIn</span>
          <i class="bi bi-linkedin"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { inject } from "vue";
import { translations } from "../translations";

export default {
  setup() {
    const currentLanguage = inject("currentLanguage");
    return { currentLanguage, translations };
  },
};
</script>

<style scoped>
.full-screen {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3c4046;
  color: white;
  text-align: center;
  overflow-y: auto; 
  padding-top: 90px;
  padding-bottom: 30px;
}

.container {
  width: 80%;
  max-width: 900px;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  color: #50fa7b;
}

.about-content {
  text-align: justify;
  font-size: 18px;
  line-height: 1.6;
  hyphens: auto;
}

.linkedin-button {
  margin-top: 20px;
}

.btn-linkedin {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #0a66c2, #084b9c);
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 180px;
}

.btn-linkedin:hover {
  background-color: #063c74;
  transform: scale(1.05);
}

.btn-linkedin i {
  font-size: 20px;
  margin-left: 10px;
}

.btn-linkedin .text {
  flex-grow: 1;
  text-align: center;
}
</style>