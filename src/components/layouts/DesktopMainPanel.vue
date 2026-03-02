<template>
  <main
    class="app-panel hidden h-full min-h-0 w-full flex-col gap-5 p-4 md:flex md:self-stretch md:gap-6 md:rounded-[1.85rem] md:px-6 md:py-6 lg:px-8 lg:py-8"
  >
    <section class="flex min-h-0 w-full flex-1 flex-col gap-4 md:gap-5">
      <slot />
    </section>
  </main>
</template>
