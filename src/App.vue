<script setup lang="ts">
  import Header from "@/components/molecules/Header.vue";
</script>

<template>
  <div
    class="flex h-dvh flex-col-reverse bg-[#EAEDF2] font-[Jost] md:flex md:flex-row md:gap-4 md:px-50 md:py-6"
  >
    <Header />
    <RouterView />
  </div>
</template>
