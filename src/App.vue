<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <div class="bg-[#EAEDF2] h-dvh px-20 py-2 font-[Jost] flex flex-row gap-4">
    <Header />
    <RouterView />
  </div>
</template>
