<script setup lang="ts">
  import LinkButton from "@/components/atoms/AtomLinkButton.vue";
  import { appRoutes } from "@/routes/routes";
</script>

<template>
  <header
    class="flex h-full w-50 min-w-50 flex-col gap-8 rounded-2xl border border-[#C9D7ED] bg-white px-4 py-8"
  >
    <h5 class="text-center text-[#8276FF]">TODO LIST</h5>
    <hr class="h-px border-none bg-[#C9D7ED]" />
    <nav class="w-fill flex flex-col gap-4">
      <LinkButton
        v-for="link in appRoutes"
        :key="link.name"
        :to="link.path"
        class="flex flex-row items-center gap-2 rounded-lg py-2 leading-6 text-[#8276FF] transition-all duration-300 ease-in-out"
        activeClass="bg-[#8276FF] text-[#EAEDF2] px-4 shadow-lg shadow-[#8276FF]/50"
        inactiveClass="hover:bg-[#D0CCFF] hover:px-4"
      >
        <component :is="link.icon" class="size-5" />
        {{ link.label }}</LinkButton
      >
    </nav>
  </header>
  <template />
</template>
