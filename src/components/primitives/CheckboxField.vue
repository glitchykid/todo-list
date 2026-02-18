<script setup lang="ts">
  const checkedTasks = defineModel<number[]>("checkedTasks");

  const props = defineProps<{
    id: string;
  }>();
</script>

<template>
  <input
    type="checkbox"
    :value="props.id"
    v-model="checkedTasks"
    class="h-5 w-5 accent-[var(--color-primary)]"
  />
</template>
