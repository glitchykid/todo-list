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
    class="app-panel sticky right-0 bottom-0 left-0 z-30 flex h-auto w-full flex-row rounded-none border-x-0 border-b-0 px-1 py-1 shadow-none md:relative md:h-full md:w-60 md:min-w-60 md:self-stretch md:flex-col md:gap-5 md:rounded-[1.85rem] md:border md:px-4 md:py-5 md:shadow-[var(--shadow-panel)]"
  >
    <h5
      class="app-section-title hidden text-center !text-[1.55rem] md:inline-block"
    >
      TODO LIST
    </h5>
    <hr class="hidden md:block" />

    <nav
      class="flex min-h-[4.5rem] w-full flex-row items-center gap-1 pb-[env(safe-area-inset-bottom)] md:h-full md:flex-col md:gap-3 md:pb-0"
      aria-label="Primary"
    >
      <div
        class="grid min-w-0 flex-1 grid-cols-3 gap-1 md:w-full md:flex-none md:grid-cols-1 md:auto-rows-min md:content-start md:gap-2"
      >
        <AppLink
          v-for="link in appRoutes"
          :key="link.name"
          :to="link.path"
          class="flex min-h-11 min-w-0 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2 text-center transition-colors md:w-full md:flex-row md:justify-start md:gap-3 md:px-3"
          activeClass="border-[var(--color-border)] bg-[var(--color-control-hover)] text-[var(--color-heading)]"
          inactiveClass="border-[var(--color-border)] bg-[var(--color-control-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-control-hover)] hover:text-[var(--color-button-hover-text)]"
        >
          <component :is="link.icon" class="size-5" />
          <span class="text-[0.8rem] leading-4 font-medium md:text-[0.95rem]">
            {{ link.label }}
          </span>
        </AppLink>
      </div>

      <div class="ml-auto flex items-center md:hidden">
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
        class="ml-auto hidden border-t border-[var(--color-border)] pt-4 md:mt-auto md:ml-0 md:flex md:w-full md:justify-center"
      >
        <ActionButton
          :icon="isDark ? SunIcon : MoonIcon"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          class="h-11 w-11 rounded-full border border-[var(--color-border)]"
          :without-paddings-for-icon="true"
          :custom-icon-size="4"
          @click="toggleTheme"
        />
      </div>
    </nav>
  </header>
</template>
