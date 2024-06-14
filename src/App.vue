<script setup>
import { ollama } from "./helpers/ollamaApi.js";
import { escribirTexto, copyText } from "./helpers/funciones";
import { ref } from "vue";
import BtnDarkMode from "./components/BtnDarkMode.vue";

const userText = ref("");
const response = ref("");
const show = ref(false);
const isDisabledUserText = ref(false);
const darkMode = ref(false);

const modeChange = (value) => {
  darkMode.value = value;
};

const chatResponse = async () => {
  show.value = true;
  response.value = "";
  isDisabledUserText.value = true;
  const answer = await ollama._call(
    `responder el siguiente mensaje:${userText.value}. Hacerlo en español.`
  );
  escribirTexto(answer.trim(), response, 50, isDisabledUserText);
  show.value = false;
};
</script>

<template>
  <div
    class="min-h-screen flex flex-col gap-5 items-center justify-center"
    :class="darkMode ? 'bg-gray-900' : 'bg-gray-100'"
  >
    <div>
      <BtnDarkMode :modeChange="modeChange" />
    </div>
    <div class="flex items-center gap-2" :class="darkMode && 'text-white'">
      <img class="logo" src="./assets/ollama.png" alt="logo llama" />
      <div>
        <h1 class="title">Ollama Chat</h1>
        <div class="flex justify-end">
          <small>By Pablo Marino</small>
        </div>
      </div>
    </div>
    <form
      @submit.prevent="chatResponse"
      class="max-w-md w-full p-6 rounded-lg"
      :class="
        darkMode
          ? 'bg-slate-600 shadow-lg shadow-slate-500/50'
          : 'bg-white shadow-md'
      "
    >
      <div class="flex gap-2">
        <img class="user" src="./assets/user.jpg" alt="usuario" />
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          :class="darkMode ? 'text-slate-100 bg-slate-700' : 'text-slate-600'"
          v-model="userText"
          :disabled="isDisabledUserText"
          @focusin="() => (userText = '')"
        />
      </div>

      <div class="relative">
        <div
          :class="show && 'overlay'"
          class="flex justify-center items-center"
        >
          <div v-show="show">
            <span
              class="loading-circle"
              :class="darkMode ? 'circle-dark' : 'circle-light'"
            ></span
            ><span
              :class="
                darkMode
                  ? 'loading-circle circle-dark'
                  : 'loading-circle circle-light'
              "
            ></span
            ><span
              :class="
                darkMode
                  ? 'loading-circle circle-dark'
                  : 'loading-circle circle-light'
              "
            ></span>
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <img class="user" src="./assets/ollama.png" alt="ollama" />
          <textarea
            rows="8"
            id="content-text-ollama"
            placeholder="Respuesta..."
            class="scrollbar-custom w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            :class="darkMode ? 'text-slate-100 bg-slate-700' : 'text-slate-600'"
            v-model="response"
            readonly
          ></textarea>
        </div>
      </div>
      <div
        v-show="response && !isDisabledUserText"
        class="flex justify-end mt-2"
      >
        <i
          class="fa fa-clipboard cursor-pointer"
          aria-hidden="true"
          @click="copyText(response)"
        ></i>
      </div>
    </form>
    <div>
      <a
        :class="darkMode && 'text-white'"
        href="https://tecito.app/pmarino"
        target="_blank"
        ><small>Invitame un tecito</small></a
      >
    </div>
  </div>
</template>

<style scoped>
#content-text-ollama {
  scroll-behavior: smooth;
}

.scrollbar-custom::-webkit-scrollbar {
  width: 12px; /* ancho de la barra de desplazamiento */
}

.scrollbar-custom::-webkit-scrollbar-track {
  background: #f1f1f1; /* color del fondo de la pista */
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  cursor: default;
  background: #888; /* color del pulgar de la barra de desplazamiento */
  border-radius: 6px; /* borde redondeado del pulgar */
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background: #555; /* color del pulgar al pasar el ratón por encima */
}
</style>
