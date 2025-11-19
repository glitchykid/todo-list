<script setup lang="ts">
  import Header from "./components/Header.vue";
</script>

<template>
  <div class="flex h-dvh flex-row gap-4 bg-[#EAEDF2] px-20 py-2 font-[Jost]">
    <Header />
    <RouterView />
  </div>
</template>
