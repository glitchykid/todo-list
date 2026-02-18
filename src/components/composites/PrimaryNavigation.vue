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
    class="app-panel sticky right-0 bottom-0 left-0 z-30 flex h-auto w-full flex-row md:relative md:h-full md:w-56 md:min-w-56 md:flex-col md:gap-6 md:px-4 md:py-6"
  >
    <h5
      class="hidden text-center !text-[var(--color-text-muted)] md:inline-block"
    >
      TODO LIST
    </h5>
    <hr class="hidden md:block" />

    <nav
      class="flex min-h-20 w-full flex-row md:h-full md:flex-col md:gap-4"
      aria-label="Primary"
    >
      <div class="flex w-full flex-row md:flex-col md:gap-3">
        <AppLink
          v-for="link in appRoutes"
          :key="link.name"
          :to="link.path"
          class="flex w-full flex-col items-center gap-1.5 py-2 md:min-h-11 md:flex-row md:justify-start md:gap-3 md:rounded-xl md:border md:border-[var(--color-border)] md:px-3 md:py-2.5 md:transition-colors"
          activeClass="bg-[var(--color-primary-hover)] !text-[var(--color-button-active-text)] md:border-[var(--color-primary-active)]"
          inactiveClass="text-[var(--color-text-muted)] md:hover:bg-[var(--color-primary-hover)] md:hover:text-[var(--color-button-hover-text)]"
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
          class="h-10 w-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)]"
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
