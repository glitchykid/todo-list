<script setup lang="ts">
  import { ref, watchEffect } from "vue";

  const props = withDefaults(
    defineProps<{
      placehodler?: string;
    }>(),
    {
      placehodler: "",
    },
  );

  const emit = defineEmits<{
    update: [filterByString: string];
  }>();

  const stringForFiltering = ref<string>("");
  watchEffect(() => {
    emit("update", stringForFiltering.value);
  });
</script>

<template>
  <div>
    <slot></slot>
    <input
      type="text"
      class="h-9 rounded-lg border border-[#8276FF] px-4 outline-none"
      :placeholder="props.placehodler"
      v-model="stringForFiltering"
    />
  </div>
</template>
