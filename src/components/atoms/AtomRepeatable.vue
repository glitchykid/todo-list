<script lang="ts">
  const typesOfRepeat = [
    "none",
    "every hour",
    "every day",
    "every week",
    "every month",
  ] as const;
</script>

<script setup lang="ts">
  interface Props {
    defaultValue: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    defaultValue: typesOfRepeat[0],
  });

  const emit = defineEmits<{
    (e: "toggle-types-of-repeat", v: boolean): void;
    (e: "handle-type", v: string): void;
    (e: "update:defaultValue", v: string): void;
  }>();

  const changeDefault = (newDefaultType: string) => {
    emit("update:defaultValue", newDefaultType);
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
      class="absolute shadow-lg shadow-[#8276FF]/50 left-1/2 -translate-x-1/2 max-w-34 z-40 mb-2 bottom-full flex max-h-60 w-full flex-col overflow-auto rounded-lg bg-white"
    >
      <span
        v-for="type of typesOfRepeat"
        :key="type"
        class="w-full gap-y-4 py-2 text-center transition-all duration-300 select-none"
        :class="
          props.defaultValue === type
            ? 'bg-[#8276FF] text-[#EAEDF2] border-[#8276FF]'
            : 'text-[#8276FF] hover:bg-[#D0CCFF]'
        "
        @click="changeDefault(type)"
        >{{ type }}</span
      >
    </div>
  </div>
</template>
