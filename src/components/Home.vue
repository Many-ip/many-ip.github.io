<template>
  <section id="home" class="full-screen">
    <div class="terminal">
      <div class="terminal-header">
        <div class="dots">
          <span class="red"></span>
          <span class="yellow"></span>
          <span class="green"></span>
        </div>
        <span class="title">bash</span>
      </div>
      <div class="terminal-body">
        <p class="prompt">
          <span class="user">manel@barcelona:~$</span>
          <span class="command" v-html="currentCommand"></span>
          <span class="cursor" v-if="!installing"></span>
        </p>
        <div v-if="installing" class="installation">
          <p v-for="(line, index) in installationSteps" :key="index" v-html="line"></p>
          <p v-if="installationComplete">
            {{ translations[currentLanguage].home.learnMore }}:
            <a href="#about" class="terminal-link">[{{ translations[currentLanguage].about.title }}]</a>
          </p>
          <p v-if="installationComplete" class="prompt">
            <span class="user">manel@barcelona:~$</span> <span class="cursor"></span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, inject, watch, onMounted } from "vue";
import { translations } from "../translations";

export default {
  setup() {
    const currentLanguage = inject("currentLanguage");

    const roles = computed(() => [
      translations[currentLanguage.value].home.role1,
      translations[currentLanguage.value].home.role2,
      translations[currentLanguage.value].home.role3,
    ]);

    const currentCommand = ref("apt-get install ");
    const installing = ref(false);
    const installationSteps = ref([]);
    const installationComplete = ref(false);

    let roleIndex = 0;
    let charIndex = 0;
    let timeoutId = null;

    const escribirComando = () => {
      if (roleIndex < roles.value.length) {
        if (charIndex < roles.value[roleIndex].length) {
          currentCommand.value += `<strong style='color: #c678dd;'>${roles.value[roleIndex][charIndex]}</strong>`;
          charIndex++;
          timeoutId = setTimeout(escribirComando, 100);
        } else {
          currentCommand.value += " ";
          charIndex = 0;
          roleIndex++;
          timeoutId = setTimeout(escribirComando, 400);
        }
      } else {
        timeoutId = setTimeout(iniciarInstalacion, 1500);
      }
    };

    const iniciarInstalacion = () => {
      installing.value = true;
      const steps = [
        translations[currentLanguage.value].home.readingPackages,
        translations[currentLanguage.value].home.buildingDependencies,
        translations[currentLanguage.value].home.readingState,
        translations[currentLanguage.value].home.installingPackages,
        ...roles.value.map(
          (pkg) =>
            `${translations[currentLanguage.value].home.installing} <strong style='color: #c678dd;'>${pkg}</strong>... <strong style='color: #50fa7b;'>✔ ${translations[currentLanguage.value].home.done}</strong>`
        ),
        translations[currentLanguage.value].home.installComplete,
      ];
      mostrarLineaPorLinea(steps);
    };

    const mostrarLineaPorLinea = (lines, index = 0) => {
      if (index < lines.length) {
        installationSteps.value.push(lines[index]);
        timeoutId = setTimeout(() => mostrarLineaPorLinea(lines, index + 1), 1000);
      } else {
        timeoutId = setTimeout(() => (installationComplete.value = true), 1500);
      }
    };

    watch(currentLanguage, () => {
      installationSteps.value = [];
      currentCommand.value = "apt-get install ";
      installing.value = false;
      installationComplete.value = false;
      roleIndex = 0;
      charIndex = 0;
      clearTimeout(timeoutId);
      setTimeout(escribirComando, 500);
    });

    onMounted(() => {
      setTimeout(escribirComando, 500);
    });

    return { currentCommand, installing, installationSteps, installationComplete, currentLanguage, translations };
  },
};
</script>

<style scoped>
.full-screen {
  min-height: 110vh;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #282c34;
  overflow: hidden;
}

.terminal {
  width: 95%;
  max-width: 800px;
  height: 90vh;
  overflow-y: auto;
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  font-family: "Courier New", Courier, monospace;
  color: #ffffff;
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #333;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.dots {
  display: flex;
  gap: 5px;
}

.dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27c93f; }

.title {
  font-size: 14px;
  font-weight: bold;
}

.terminal-body {
  padding: 15px;
  font-size: 16px;
}

.prompt {
  display: flex;
  flex-wrap: wrap;
}

.user {
  color: #50fa7b;
}

.command {
  color: #ffffff;
}

.cursor {
  display: inline-block;
  width: 5px;
  height: 1em;
  background: #ffffff;
  animation: blink 0.7s steps(2, start) infinite;
}

.terminal-link {
  color: #00afff;
  text-decoration: none;
}

.terminal-link:hover {
  text-decoration: underline;
}

@keyframes blink {
  50% { opacity: 0; }
}

@media (max-width: 768px) {
  .full-screen {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .terminal {
    width: 100%;
    max-height: 80vh;
  }

  .terminal-body {
    font-size: 14px;
  }
}
</style>
