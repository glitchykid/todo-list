<script setup lang="ts">
  import PrimaryNavigation from "@/components/composites/PrimaryNavigation.vue";
</script>

<template>
  <div
    class="mx-auto flex h-dvh w-full max-w-[1600px] flex-col-reverse gap-0 px-0 py-0 md:flex-row md:justify-center md:gap-6 md:px-8 md:py-6"
  >
    <PrimaryNavigation />
    <RouterView />
  </div>
</template>
