<script setup lang="ts">
import AppLink from "./AppLink.vue";
import AppIcon from "./AppIcon.vue";
import { appRoutes } from "@/routes/routes";

type LinkState = "base" | "active" | "inactive";

const headerButtonStyle: Record<LinkState, string> = {
  base: "py-2 rounded-[8px] transition-all duration-300 ease-in-out flex flex-row place-items-center gap-2",
  active: "bg-[#8276FF] text-[#EAEDF2] px-4",
  inactive: "hover:bg-[#D0CCFF] text-[#8276FF] hover:px-4",
} as const;
</script>

<template>
  <header
    class="bg-white min-w-50 w-50 h-full px-4 py-8 flex flex-col gap-8 border-1 border-[#C9D7ED] rounded-[16px]"
  >
    <h5 class="text-center text-[#8276FF]">TODO LIST</h5>
    <hr />
    <nav class="flex flex-col gap-4 w-fill">
      <AppLink
        v-for="link in appRoutes"
        :key="link.id"
        :to="link.path"
        :class="headerButtonStyle.base"
        :active-class="headerButtonStyle.active"
        :inactive-class="headerButtonStyle.inactive"
      >
        <AppIcon :name="link.icon" />
        {{ link.label }}</AppLink
      >
    </nav>
  </header>
</template>
