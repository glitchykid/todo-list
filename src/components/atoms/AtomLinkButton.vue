<script setup lang="ts">
  import type { RouterLink, RouterLinkProps } from "vue-router";
  const props = defineProps<
    RouterLinkProps & {
      inactiveClass?: string;
    }
  >();
</script>

<template>
  <RouterLink to="" />
</template>
