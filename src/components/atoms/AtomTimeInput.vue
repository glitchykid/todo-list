<script setup lang="ts">
  import { removeAllExceptNumbers } from "@/utils/stringprocess";
  import { ref, watch } from "vue";

  interface Props {
    placeholder: string;
    max: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: "Type something...",
    max: 0,
  });

  const emit = defineEmits<{
    (e: "take-value", val: string): void;
  }>();

  const value = ref<string>("");

  watch(value, (newVal) => {
    emit("take-value", newVal);
  });

  const sanitize = (e: Event) => {
    const el = e.target as HTMLInputElement;
    let cleaned = removeAllExceptNumbers(el.value);
    if (Number(cleaned) > props.max) cleaned = String(props.max);
    el.value = cleaned;
    value.value = cleaned;
  };
</script>

<template>
  <input
    :placeholder="props.placeholder"
    :maxlength="2"
    type="text"
    v-model="value"
    @input="sanitize"
    class="flex w-full min-w-15 flex-row rounded-lg border border-[#8276FF] px-4 py-3 text-center outline-none"
  />
</template>
