<script setup lang="ts">
  import PrimaryNavigation from "@/components/composites/PrimaryNavigation.vue";
</script>

<template>
  <div
    class="mx-auto flex h-dvh min-h-dvh w-full max-w-[1700px] flex-col-reverse gap-3 overflow-hidden px-0 py-0 md:flex-row md:items-stretch md:justify-center md:gap-6 md:px-6 md:py-6 xl:px-10"
  >
    <PrimaryNavigation />
    <RouterView />
  </div>
</template>
