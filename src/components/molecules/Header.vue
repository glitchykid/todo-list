<script setup lang="ts">
  import LinkButton from "@/components/atoms/LinkButton.vue";
  import { appRoutes } from "@/routes/routes";
</script>

<template>
  <header
    class="sticky right-0 bottom-0 left-0 z-30 flex h-auto w-full flex-row bg-white md:relative md:h-full md:w-50 md:min-w-50 md:flex-col md:gap-8 md:rounded-2xl md:border md:border-[#C9D7ED] md:px-4 md:py-8"
  >
    <h5 class="hidden text-center text-[#8276FF] md:inline-block">TODO LIST</h5>
    <hr />
    <nav class="flex min-h-20 w-full flex-row md:flex-col md:gap-4">
      <LinkButton
        v-for="link in appRoutes"
        :key="link.name"
        :to="link.path"
        class="flex w-full flex-col items-center gap-1.5 py-2 text-[#8276FF] md:min-h-10 md:flex-row md:justify-start md:gap-2 md:rounded-lg md:py-2 md:transition-all md:duration-300 md:ease-in-out"
        activeClass="bg-[#8276FF] text-[#EAEDF2] md:px-4 md:shadow-lg shadow-[#8276FF]/50"
        inactiveClass="md:hover:bg-[#D0CCFF] md:hover:px-4"
      >
        <component :is="link.icon" class="size-9 md:size-5" />
        <div class="text-[16px] leading-4">
          {{ link.label }}
        </div>
      </LinkButton>
    </nav>
  </header>
  <template />
</template>
