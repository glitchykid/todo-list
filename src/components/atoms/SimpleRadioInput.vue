<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      id: string;
      value: string;
      picked: string;
    }>(),
    {
      id: "default",
      value: "default",
      picked: "default",
    },
  );
</script>

<template>
  <div class="flex flex-row gap-2">
    <label :for="props.id" class="text-nowrap">{{ props.value }}</label>
    <input
      type="radio"
      :id="props.id"
      :value="props.value"
      v-model="props.picked"
      class="rounded-lg accent-[#8276FF]"
    />
  </div>
</template>
