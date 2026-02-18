<script setup lang="ts">
  import DesktopMainPanel from "@/components/layouts/DesktopMainPanel.vue";
  import ArchiveManagementPanel from "@/components/layouts/ArchiveManagementPanel.vue";
  import MobileMainPanel from "@/components/layouts/MobileMainPanel.vue";
</script>

<template>
  <DesktopMainPanel>
    <ArchiveManagementPanel type="history" />
  </DesktopMainPanel>

  <MobileMainPanel>
    <ArchiveManagementPanel type="history" />
  </MobileMainPanel>
</template>
