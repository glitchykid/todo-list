<script setup lang="ts">
  import { ref, watch } from "vue";

  interface Props {
    placeholder: string;
    maxlength: number;
    max: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: "Type something...",
    maxlength: 10,
    step: 1,
    max: 100,
  });

  const emit = defineEmits<{
    (e: "take-value", val: number): void;
  }>();

  const value = ref<number | null>(null);

  watch(value, (newVal) => {
    if (newVal === null) return;
    emit("take-value", newVal);
  });

  const sanitize = (e: Event) => {
    const el = e.target as HTMLInputElement;
    let cleaned = el.value.replace(/[^0-9]/g, "");
    let num = Number(cleaned);

    if (num > props.max) num = props.max;
    el.value = String(num);
    value.value = num;
  };
</script>

<template>
  <input
    :placeholder="props.placeholder"
    :maxlength="props.maxlength"
    type="text"
    v-model="value"
    @input="sanitize"
    inputmode="numeric"
    class="px-4 py-3 text-center flex flex-row min-w-15 w-full border border-[#8276FF] rounded-lg outline-none"
  />
</template>
