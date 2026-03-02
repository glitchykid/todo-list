<script setup lang="ts">
  import PrimaryNavigation from "@/components/composites/PrimaryNavigation.vue";
</script>

<template>
  <div
    class="mobile-shell mx-auto flex min-h-dvh w-full max-w-[1700px] flex-col-reverse gap-0 md:h-dvh md:overflow-hidden md:flex-row md:items-stretch md:justify-center md:gap-6 md:px-6 md:py-6 xl:px-10"
  >
    <PrimaryNavigation />
    <RouterView />
  </div>
</template>
