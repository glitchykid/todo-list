<script setup lang="ts">
  import MoleculeSpaceAside from "@/components/molecules/MoleculeSpaceAside.vue";
  import OrganismHeaderForMessages from "@/components/organisms/OrganismHeaderForMessages.vue";
  import OrganismMainForMessages from "@/components/organisms/OrganismMainForMessages.vue";
  import TemplateChatInputForMessages from "@/components/templates/TemplateChatInputForMessages.vue";
</script>

<template>
  <main
    class="flex h-full w-full flex-col gap-8 rounded-2xl border border-[#C9D7ED] bg-white px-9 py-8"
  >
    <OrganismHeaderForMessages />
    <OrganismMainForMessages />
    <TemplateChatInputForMessages />
  </main>
  <aside
    class="flex h-full w-50 min-w-50 flex-col rounded-2xl border border-[#C9D7ED] bg-white py-8"
  >
    <MoleculeSpaceAside />
  </aside>
</template>
