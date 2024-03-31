<script setup>
import { ollama } from "./helpers/ollamaApi.js";
import { escribirTexto } from "./helpers/funciones";
import { ref } from "vue";

const userText = ref("");
const response = ref("");
const show = ref(false);

const isActiveText = ref(false);

const chatResponse = async () => {
  show.value = true;
  isActiveText.value = false;
  const answer = await ollama._call(
    `responder el siguiente mensaje:${userText.value}. Hacerlo en español.`
  );
  escribirTexto(answer.trim(), response, 50);
  show.value = false;
  isActiveText.value = true;
};
</script>

<template>
  <div
    class="bg-gray-100 min-h-screen flex flex-col gap-5 items-center justify-center"
  >
    <div class="flex items-center gap-2">
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
      class="max-w-md w-full bg-white p-6 rounded-lg shadow-md"
    >
      <div class="flex gap-2">
        <img class="user" src="./assets/user.jpg" alt="usuario" />
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          :class="isActiveText && ''"
          v-model="userText"
          :disabled="show"
          @focusin="() => (userText = '')"
        />
      </div>

      <div class="relative">
        <div
          :class="show && 'overlay'"
          class="flex justify-center items-center"
        >
          <div v-show="show">
            <span class="loading-circle"></span
            ><span class="loading-circle"></span
            ><span class="loading-circle"></span>
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <img class="user" src="./assets/ollama.png" alt="ollama" />
          <textarea
            rows="8"
            placeholder="Respuesta..."
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-slate-600"
            v-model="response"
            readonly
          ></textarea>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
