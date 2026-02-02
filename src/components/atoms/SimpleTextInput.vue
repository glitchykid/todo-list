<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      placehodler?: string;
    }>(),
    {
      placehodler: "",
    },
  );

  const filter = defineModel<string, "trim">("filter");
</script>

<template>
  <div :class="[$attrs.class]">
    <slot></slot>
    <input
      type="text"
      class="h-9 w-full rounded-lg border border-[#8276FF] px-4 outline-none"
      :placeholder="props.placehodler"
      v-model="filter"
    />
  </div>
</template>
