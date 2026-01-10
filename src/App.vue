<script setup lang="ts">
  import Header from "@/components/molecules/MoleculeHeader.vue";
</script>

<template>
  <div class="flex h-dvh flex-row gap-4 bg-[#EAEDF2] lg:px-50 py-6 font-[Jost]">
    <Header />
    <RouterView />
  </div>
</template>
