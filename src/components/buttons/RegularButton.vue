<script setup lang="ts">
import Calendar from "@/components/Calendar.vue";
import { ref } from "vue";

const props = defineProps<{
  name: string;
  label: string;
  active: boolean;
  border: boolean;
}>();

const popup = ref(false);

const tooglePopup = () => {
  popup.value = true;
};
</script>

<template>
  <div class="relative z-10 inline-block">
    <button
      class="px-4 py-2 transition-all rounded-[8px] duration-300"
      :class="[
        props.border ? 'border-1 border-[#8276FF]' : '',
        active
          ? 'bg-[#8276FF] text-[#EAEDF2]'
          : 'text-[#8276FF] hover:bg-[#D0CCFF]',
      ]"
      @click="tooglePopup"
    >
      <slot>{{ props.label }}</slot>
      <Calendar v-if="props.name === 'select' && props.active && popup" />
    </button>
  </div>
</template>
