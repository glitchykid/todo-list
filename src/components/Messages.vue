<script setup lang="ts">
  import AppIcon from "./AppIcon.vue";
</script>

<template>
  <div class="ml-auto mt-auto flex w-auto flex-col rounded-t-2xl overflow-hidden rounded-bl-2xl">
    <div class="flex h-9 items-center bg-[#D0CCFF] px-4">
      <slot>Example</slot>
    </div>
    <div class="flex h-9 flex-row">
      <div
        class="flex w-auto flex-row items-center justify-center gap-2 bg-[#3E3D4D] px-5 text-[#ABA4FF]"
      >
        <AppIcon name="arrowPath" />
        <slot>everyday</slot>
      </div>
      <div
        class="flex w-auto flex-row items-center justify-center gap-2 bg-[#ABA4FF] px-5 text-[#3E3D4D]"
      >
        <AppIcon name="clock" />
        <slot>00:00</slot>
      </div>
      <div
        class="flex w-9 items-center justify-center bg-[#92D6F3] text-[#314D59]"
      >
        <AppIcon name="arrowLongRight" />
      </div>
      <div
        class="flex w-9 items-center justify-center bg-[#8CE98C] text-[#274F27]"
      >
        <AppIcon name="check" />
      </div>
      <div
        class="flex w-9 items-center justify-center bg-[#E27575] text-[#4F2929]"
      >
        <AppIcon name="trash" />
      </div>
    </div>
  </div>
</template>
