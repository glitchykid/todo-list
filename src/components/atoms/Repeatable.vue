<script setup lang="ts">
  export type Repeat = "none" | "every day" | "every week" | "every month";

  const typesOfRepeat: Repeat[] = [
    "none",
    "every day",
    "every week",
    "every month",
  ];

  const defaultValue = defineModel<Repeat>("defaultValue");

  const emit = defineEmits<{
    (e: "toggle-types-of-repeat", v: boolean): void;
    (e: "handle-type", v: string): void;
    (e: "update:defaultValue", v: string): void;
  }>();

  const changeDefault = (newDefaultType: Repeat) => {
    defaultValue.value = newDefaultType;
    emit("toggle-types-of-repeat", false);
  };
</script>

<template>
  <div>
    <div
      class="fixed inset-0 z-30 bg-black/20"
      @click="emit('toggle-types-of-repeat', false)"
    />
    <div
      class="absolute bottom-full left-1/2 z-40 mb-2 flex max-h-60 w-full max-w-34 -translate-x-1/2 flex-col overflow-auto rounded-lg bg-white shadow-lg shadow-[#8276FF]/50"
    >
      <span
        v-for="type in typesOfRepeat"
        :key="type"
        class="w-full gap-y-4 py-2 text-center transition-all duration-300 select-none"
        :class="
          defaultValue === type
            ? 'border-[#8276FF] bg-[#8276FF] text-[#EAEDF2]'
            : 'text-[#8276FF] hover:bg-[#D0CCFF]'
        "
        @click="changeDefault(type)"
        >{{ type }}</span
      >
    </div>
  </div>
</template>
