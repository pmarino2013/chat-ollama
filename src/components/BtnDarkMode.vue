<template>
  <label for="toggle" class="flex items-center cursor-pointer">
    <div class="relative">
      <input type="checkbox" v-model="check" id="toggle" class="sr-only" />
      <div class="block bg-gray-600 w-14 h-8 rounded-full shadow-inner"></div>
      <div
        class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform transform text-center"
        :class="check && 'effect'"
      >
        <i
          class="text-slate-500"
          :class="check ? 'fa fa-moon-o' : 'fa fa-sun-o'"
          aria-hidden="true"
        ></i>
      </div>
    </div>
    <!-- <div
      class="ml-3 font-medium"
      :class="check ? 'text-white' : 'text-gray-700'"
    >
      {{ check ? "Modo oscuro " : "Modo claro" }}
    </div> -->
  </label>
</template>
<script setup>
import { ref, watch } from "vue";
const check = ref(false);
const props = defineProps({
  modeChange: Function,
});

watch(check, (newCheck) => {
  props.modeChange(newCheck);
});
</script>
<style scope>
.effect {
  transform: translateX(1.5rem);
}
</style>
