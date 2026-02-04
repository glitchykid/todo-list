<template>
  <main
    class="hidden h-full w-full flex-col gap-4 bg-white p-4 md:flex md:gap-8 md:rounded-2xl md:border md:border-[#C9D7ED] md:px-9 md:py-8"
  >
    <header v-if="$slots.header" class="shrink-0">
      <slot name="header" />
    </header>

    <section v-if="$slots.toolbar" class="shrink-0">
      <slot name="toolbar" />
    </section>

    <section class="flex min-h-0 flex-1 flex-col gap-4">
      <slot />
    </section>

    <footer v-if="$slots.footer" class="shrink-0">
      <slot name="footer" />
    </footer>
  </main>
</template>
