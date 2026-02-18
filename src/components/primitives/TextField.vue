<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      placeholder?: string;
    }>(),
    {
      placeholder: "",
    },
  );

  const filter = defineModel<string, "trim">("filter");
</script>

<template>
  <div :class="[$attrs.class]">
    <slot></slot>
    <input
      type="text"
      class="h-11 w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 text-[var(--color-text)]"
      :placeholder="props.placeholder"
      v-model="filter"
    />
  </div>
</template>
