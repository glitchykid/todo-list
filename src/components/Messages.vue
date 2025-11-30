<script setup lang="ts">
  import {
    ArrowLongRightIcon,
    ArrowPathIcon,
    CheckIcon,
    ClockIcon,
    TrashIcon,
  } from "@heroicons/vue/20/solid";

  interface Props {
    title: string | null;
    repeatable?: string;
    dueDate: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: null,
    dueDate: "00:00",
  });

  const styles: { textAndIcon: string; onlyIcon: string } = {
    textAndIcon: "flex w-40 flex-row items-center justify-center gap-2",
    onlyIcon: "flex w-9 items-center justify-center",
  };
</script>

<template>
  <div
    class="ml-auto flex flex-col overflow-hidden rounded-t-2xl rounded-bl-2xl"
  >
    <div
      class="bg-[#D0CCFF] px-4 py-1.5 leading-6 text-pretty wrap-break-word break-all text-[#3E3D4D]"
      :class="props.repeatable ? 'w-107' : 'w-58'"
    >
      <span>{{ props.title }}</span>
    </div>
    <div class="flex h-9 flex-row">
      <div
        v-if="props.repeatable"
        class="bg-[#3E3D4D] px-5 text-[#ABA4FF]"
        :class="styles.textAndIcon"
      >
        <ArrowPathIcon class="size-5" />
        <span>{{ props.repeatable }}</span>
      </div>
      <div class="bg-[#ABA4FF] px-5 text-[#3E3D4D]" :class="styles.textAndIcon">
        <ClockIcon class="size-5" />
        <span>{{ props.dueDate }}</span>
      </div>
      <div
        class="bg-[#92D6F3] text-[#314D59]"
        :class="styles.onlyIcon"
        v-if="props.repeatable"
      >
        <ArrowLongRightIcon class="size-5" />
      </div>
      <div
        class="bg-[#8CE98C] text-[#274F27] transition-colors duration-300"
        :class="styles.onlyIcon"
      >
        <CheckIcon class="size-5" />
      </div>
      <div
        class="bg-[#E27575] text-[#4F2929] transition-colors duration-300"
        :class="styles.onlyIcon"
      >
        <TrashIcon class="size-5" />
      </div>
    </div>
  </div>
</template>
