<template>
  <main
    class="mobile-shell mobile-shell-compact-gap flex h-full flex-1 flex-col gap-4 overflow-hidden bg-white md:hidden"
  >
    <header v-if="$slots.header" class="shrink-0">
      <slot name="header" />
    </header>

    <section v-if="$slots.toolbar" class="shrink-0">
      <slot name="toolbar" />
    </section>

    <!-- min-h-0 is critical so the body can scroll within flex layouts -->
    <section class="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
      <slot />
    </section>

    <footer v-if="$slots.footer" class="shrink-0">
      <slot name="footer" />
    </footer>
  </main>
</template>
