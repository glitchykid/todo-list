<script setup lang="ts">
  import { ref } from "vue";

  const emit = defineEmits<{
    (e: "toggle-types-of-repeat", value: boolean): void;
  }>();

  const typesOfRepeat: string[] = [
    "nah",
    "every hour",
    "every day",
    "every week",
    "every month",
  ];

  const selected = ref<Boolean>(false);
</script>

<template>
  <div>
    <div
      class="fixed inset-0 z-30 bg-black/20"
      @click="emit('toggle-types-of-repeat', false)"
    />
    <div
      class="absolute shadow-lg shadow-[#8276FF]/50 left-1/2 -translate-x-1/2 max-w-34 z-40 mb-2 bottom-full flex max-h-60 w-full flex-col overflow-auto rounded-lg border border-[#C9D7ED] bg-white"
    >
      <span
        v-for="type of typesOfRepeat"
        :key="type"
        class="w-full gap-y-4 py-2 text-center transition-all duration-300 select-none"
        :class="
          selected === type
            ? 'bg-[#8276FF] text-[#EAEDF2]'
            : 'text-[#8276FF] hover:bg-[#D0CCFF]'
        "
        >{{ type }}</span
      >
    </div>
  </div>
</template>
