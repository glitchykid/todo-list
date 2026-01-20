<script setup lang="ts">
  import MoleculeSpaceAside from "@/components/molecules/MoleculeSpaceAside.vue";
  import OrganismHeaderForMessages from "@/components/organisms/OrganismHeaderForMessages.vue";
  import OrganismMainForMessages from "@/components/organisms/OrganismMainForMessages.vue";
  import ChatInputForMessages from "@/components/templates/ChatInputForMessages.vue";
  import MainWindow from "@/components/templates/MainWindow.vue";
</script>

<template>
  <MainWindow>
    <OrganismHeaderForMessages />
    <OrganismMainForMessages />
    <ChatInputForMessages />
  </MainWindow>
  <aside
    class="flex h-full w-50 min-w-50 flex-col rounded-2xl border border-[#C9D7ED] bg-white py-8"
  >
    <MoleculeSpaceAside />
  </aside>
</template>
