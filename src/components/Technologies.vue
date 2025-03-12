<template>
  <section id="technologies" class="full-screen">
    <div class="container">
      <h2 class="section-title">{{ translations[currentLanguage].technologies.title }}</h2>
      
      <div class="category">
        <h3 class="category-title">{{ translations[currentLanguage].technologies.programming }}</h3>
        <div class="grid">
          <div v-for="tech in programmingTechnologies" :key="tech.name" class="tech-card">
            <img :src="tech.logo" :alt="tech.name" class="tech-logo" />
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>
      
      <div class="category">
        <h3 class="category-title">{{ translations[currentLanguage].technologies.systems }}</h3>
        <div class="grid">
          <div v-for="tech in systemsTechnologies" :key="tech.name" class="tech-card">
            <img :src="tech.logo" :alt="tech.name" class="tech-logo" />
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, inject } from "vue";
import { translations } from "../translations";

export default {
  setup() {
    const currentLanguage = inject("currentLanguage");

    const programmingTechnologies = ref([
      { name: "JavaScript", logo: "img/javascript.svg" },
      { name: "Vue.js", logo: "img/vue.png" },
      { name: "Python", logo: "img/python.png" },
      { name: "Java", logo: "img/java.png" },
      { name: "HTML", logo: "img/html.png" },
      { name: "CSS", logo: "img/css.png" },
      { name: "PHP", logo: "img/php.svg" },
      { name: "Symfony", logo: "img/symfony.png" },
      { name: "MySQL", logo: "img/mysql.svg" },
      { name: "MongoDB", logo: "img/mongodb.webp" },
      { name: "Postman", logo: "img/postman.webp" },
      { name: "VS Code", logo: "img/vscode.png" },
      { name: "Git", logo: "img/git.png" },
    ]);

    const systemsTechnologies = ref([
      { name: "Linux", logo: "img/linux.png" },
      { name: "Bash", logo: "img/bash.png" },
      { name: "Windows", logo: "img/windows.png" },
      { name: "Docker", logo: "img/docker.webp" },
      { name: "Apache", logo: "img/apache.png" },
      { name: "Nginx", logo: "img/nginx.webp" },
      { name: "Kaspersky", logo: "img/kaspersky.jpg" },
      { name: "Virtual Box", logo: "img/virtualbox.png" },
      { name: "VMWare", logo: "img/vmware.png" },
      { name: "pfSense", logo: "img/pfsense.png" },
    ]);

    return { currentLanguage, translations, programmingTechnologies, systemsTechnologies };
  },
};
</script>
<style scoped>
.full-screen {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #282c34;
  color: white;
  text-align: center;
  overflow-y: auto; 
  padding-top: 170px;
  padding-bottom: 30px;
}

.container {
  width: 80%;
  max-width: 900px;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.category {
  margin-bottom: 40px;
}

.category-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #c678dd;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  justify-items: center;
}

.tech-card {
  background: #1e1e1e;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tech-card:hover {
  transform: scale(1.1);
}

.tech-logo {
  width: 80px; 
  height: 80px; 
  object-fit: contain;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}

.tech-name {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
}
</style>
