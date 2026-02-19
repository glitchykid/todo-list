<script setup lang="ts">
  import ActionButton from "@/components/primitives/ActionButton.vue";
  import AppLink from "@/components/primitives/AppLink.vue";
  import { useTheme } from "@/composables/useTheme";
  import { appRoutes } from "@/routes/routes";
  import { MoonIcon, SunIcon } from "@heroicons/vue/20/solid";

  const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <header
    class="app-panel sticky right-0 bottom-0 left-0 z-30 flex h-auto w-full flex-row rounded-none border-x-0 border-b-0 md:relative md:h-full md:w-56 md:min-w-56 md:flex-col md:gap-6 md:border md:px-4 md:py-6"
  >
    <h5
      class="hidden text-center !text-[var(--color-text-muted)] md:inline-block"
    >
      TODO LIST
    </h5>
    <hr class="hidden md:block" />

    <nav
      class="flex min-h-20 w-full flex-row items-center gap-2 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:h-full md:flex-col md:gap-4 md:px-0 md:py-0"
      aria-label="Primary"
    >
      <div class="flex min-w-0 flex-1 flex-row gap-2 md:w-full md:flex-col md:gap-3">
        <AppLink
          v-for="link in appRoutes"
          :key="link.name"
          :to="link.path"
          class="flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl border border-[var(--color-border)] px-2 py-2 transition-colors md:w-full md:flex-none md:flex-row md:justify-start md:gap-3 md:px-3 md:py-2.5"
          activeClass="border-[var(--color-primary-active)] bg-[var(--color-primary-hover)] !text-[var(--color-button-active-text)]"
          inactiveClass="bg-[var(--color-control-surface)] text-[var(--color-text-muted)] md:hover:bg-[var(--color-primary-hover)] md:hover:text-[var(--color-button-hover-text)]"
        >
          <component :is="link.icon" class="size-9 md:size-5" />
          <div class="text-[16px] leading-4">
            {{ link.label }}
          </div>
        </AppLink>
      </div>

      <div class="flex items-center md:hidden">
        <ActionButton
          :icon="isDark ? SunIcon : MoonIcon"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          class="h-11 w-11 rounded-xl border border-[var(--color-border)]"
          :without-paddings-for-icon="true"
          :custom-icon-size="4"
          @click="toggleTheme"
        />
      </div>

      <div
        class="ml-auto hidden border-t border-[var(--color-border)] pt-4 md:mt-auto md:ml-0 md:flex md:justify-center"
      >
        <ActionButton
          :icon="isDark ? SunIcon : MoonIcon"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          class="h-10 w-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-soft)]"
          :without-paddings-for-icon="true"
          :custom-icon-size="4"
          @click="toggleTheme"
        />
      </div>
    </nav>
  </header>
</template>
