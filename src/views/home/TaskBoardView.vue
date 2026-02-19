<script setup lang="ts">
  import WorkspacePanel from "@/components/composites/WorkspacePanel.vue";
  import TaskBoardHeader from "@/components/sections/TaskBoardHeader.vue";
  import TaskFeedPanel from "@/components/sections/TaskFeedPanel.vue";
  import TaskComposerSection from "@/components/layouts/TaskComposerSection.vue";
  import DesktopMainPanel from "@/components/layouts/DesktopMainPanel.vue";
  import MobileMainPanel from "@/components/layouts/MobileMainPanel.vue";
  import { ref } from "vue";

  const toggleAside = ref<boolean>(false);
</script>

<template>
  <!-- Desktop -->
  <DesktopMainPanel>
    <TaskBoardHeader />
    <TaskFeedPanel />
    <TaskComposerSection />
  </DesktopMainPanel>

  <!-- Mobile -->
  <MobileMainPanel>
    <template #header>
      <TaskBoardHeader v-model:toggle-aside="toggleAside" />
    </template>

    <div class="flex-1 overflow-y-hidden">
      <TaskFeedPanel />
    </div>

    <template #footer>
      <TaskComposerSection />
    </template>
  </MobileMainPanel>

  <!-- Mobile overlay -->
  <Transition name="fade">
    <div
      v-if="toggleAside"
      class="fixed inset-0 z-[80] bg-[var(--color-overlay)] md:hidden"
      @click="toggleAside = false"
    />
  </Transition>

  <!-- Sidebar (Desktop only) -->
  <aside
    class="app-panel hidden rounded-none py-8 md:flex md:h-full md:w-50 md:min-w-50 md:flex-col"
  >
    <WorkspacePanel />
  </aside>

  <!-- Sidebar (Mobile) -->
  <Transition name="sheet-left">
    <aside
      v-if="toggleAside"
      class="fixed inset-y-0 left-0 z-[100] flex h-full w-[72%] max-w-[22rem] flex-col overflow-y-auto border-r border-[var(--color-border)] bg-[var(--color-surface-raised)] py-6 shadow-[var(--shadow-panel)] md:hidden"
    >
      <WorkspacePanel />
    </aside>
  </Transition>
</template>
