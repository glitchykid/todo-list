<template>
  <main
    class="mobile-shell-edge app-panel flex h-full min-h-0 flex-1 flex-col gap-2 overflow-hidden rounded-none border-0 md:hidden"
  >
    <header v-if="$slots.header" class="shrink-0">
      <slot name="header" />
    </header>

    <section v-if="$slots.toolbar" class="shrink-0">
      <slot name="toolbar" />
    </section>

    <section class="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
      <slot />
    </section>

    <footer v-if="$slots.footer" class="shrink-0">
      <slot name="footer" />
    </footer>
  </main>
</template>
