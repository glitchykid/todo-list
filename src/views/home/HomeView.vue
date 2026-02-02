<script setup lang="ts">
  import SpaceAside from "@/components/molecules/SpaceAside.vue";
  import HeaderForMessages from "@/components/organisms/HeaderForMessages.vue";
  import MainForMessages from "@/components/organisms/MainForMessages.vue";
  import ChatInputForMessages from "@/components/templates/ChatInputForMessages.vue";
  import MainWindowDesktop from "@/components/templates/MainWindowDesktop.vue";
  import MainWindowMobile from "@/components/templates/MainWindowMobile.vue";
  import { ref } from "vue";

  const toggleAside = ref<boolean>(false);
</script>

<template>
  <!-- Desktop: Use MainWindow with original layout -->
  <MainWindowDesktop>
    <HeaderForMessages />
    <MainForMessages />
    <ChatInputForMessages />
  </MainWindowDesktop>

  <!-- Mobile: Custom layout with fixed header and input -->
  <MainWindowMobile>
    <!-- Fixed Header -->
    <div class="shrink-0 bg-white">
      <HeaderForMessages v-model:toggle-aside="toggleAside" />
    </div>
    <!-- Scrollable Messages Area -->
    <div class="flex-1 overflow-y-hidden bg-white">
      <MainForMessages />
    </div>
    <!-- Fixed Input -->
    <div class="shrink-0 bg-white">
      <ChatInputForMessages />
    </div>
    <div
      class="fixed inset-0 z-80 bg-black/20 transition-all duration-300 ease-in-out md:hidden"
      :class="
        toggleAside ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
      "
      @click="toggleAside = false"
    />
  </MainWindowMobile>

  <!-- Sidebar (Desktop only) -->
  <aside
    class="hidden py-8 md:flex md:h-full md:w-50 md:min-w-50 md:flex-col md:rounded-2xl md:border md:border-[#C9D7ED] md:bg-white"
  >
    <SpaceAside />
  </aside>

  <!-- Sidebar <Mobile only) -->
  <aside
    class="absolute z-100 flex h-full w-[60%] flex-col bg-white py-8 transition-transform duration-300 ease-in-out md:hidden"
    :class="toggleAside ? 'translate-x-0' : '-translate-x-full'"
  >
    <SpaceAside />
  </aside>
</template>
