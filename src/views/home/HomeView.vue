<script setup lang="ts">
  import SpaceAside from "@/components/molecules/SpaceAside.vue";
  import HeaderForMessages from "@/components/organisms/HeaderForMessages.vue";
  import MainForMessages from "@/components/organisms/MainForMessages.vue";
  import ChatInputForMessages from "@/components/templates/ChatInputForMessages.vue";
  import MainWindow from "@/components/templates/MainWindow.vue";
</script>

<template>
  <MainWindow>
    <HeaderForMessages />
    <MainForMessages />
    <ChatInputForMessages />
  </MainWindow>
  <aside
    class="flex h-full w-50 min-w-50 flex-col rounded-2xl border border-[#C9D7ED] bg-white py-8"
  >
    <SpaceAside />
  </aside>
</template>
