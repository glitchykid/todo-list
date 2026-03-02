<template>
  <main
    class="mobile-shell-edge app-panel flex h-full min-h-0 flex-1 flex-col gap-4 overflow-hidden rounded-none border-0 shadow-none md:hidden"
  >
    <header v-if="$slots.header" class="shrink-0 px-3 pt-3 pb-2">
      <slot name="header" />
    </header>

    <section v-if="$slots.toolbar" class="shrink-0 px-3">
      <slot name="toolbar" />
    </section>

    <section class="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-3 pb-1">
      <slot />
    </section>

    <footer
      v-if="$slots.footer"
      class="shrink-0 px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
    >
      <slot name="footer" />
    </footer>
  </main>
</template>
