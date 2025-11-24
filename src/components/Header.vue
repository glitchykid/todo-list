<script setup lang="ts">
  import { appRoutes } from "@/routes/routes";
  import AppIcon from "./AppIcon.vue";
  import LinkButton from "./buttons/LinkButton.vue";

  type LinkState = "base" | "active" | "inactive";

  const headerButtonStyle: Record<LinkState, string> = {
    base: "py-2 rounded-[8px] transition-all duration-300 ease-in-out flex flex-row items-center gap-2",
    active: "bg-[#8276FF] text-[#EAEDF2] px-4",
    inactive: "hover:bg-[#D0CCFF] text-[#8276FF] hover:px-4",
  } as const;
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
        :class="headerButtonStyle.base"
        :active-class="headerButtonStyle.active"
        :inactive-class="headerButtonStyle.inactive"
      >
        <AppIcon :name="link.icon" />
        {{ link.label }}</LinkButton
      >
    </nav>
  </header>
  <template />
</template>
