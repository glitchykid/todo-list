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
    class="app-panel hidden py-7 md:flex md:h-full md:w-56 md:min-w-56 md:flex-col md:px-3"
  >
    <WorkspacePanel />
  </aside>

  <!-- Sidebar (Mobile) -->
  <Transition name="sheet-left">
    <aside
      v-if="toggleAside"
      class="fixed inset-y-3 left-3 z-[100] flex h-[calc(100%-1.5rem)] w-[74%] max-w-[22rem] flex-col overflow-y-auto rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-6 shadow-[var(--shadow-panel)] md:hidden"
    >
      <WorkspacePanel />
    </aside>
  </Transition>
</template>
