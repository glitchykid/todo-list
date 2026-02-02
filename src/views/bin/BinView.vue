<script setup lang="ts">
  import MainWindowDesktop from "@/components/templates/MainWindowDesktop.vue";
  import MainWindowForHistoryAndBin from "@/components/templates/MainWindowForHistoryAndBin.vue";
  import MainWindowMobile from "@/components/templates/MainWindowMobile.vue";
</script>

<template>
  <MainWindowDesktop>
    <MainWindowForHistoryAndBin type="bin" />
  </MainWindowDesktop>

  <MainWindowMobile>
    <MainWindowForHistoryAndBin type="bin" />
  </MainWindowMobile>
</template>
