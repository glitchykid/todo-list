<script setup lang="ts">
  import AppIcon from "./AppIcon.vue";

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
    class="ml-auto flex w-auto flex-col overflow-hidden rounded-t-2xl rounded-bl-2xl"
  >
    <div
      class="bg-[#D0CCFF] px-4 py-1.5 leading-6 text-pretty wrap-break-word break-all text-[#3E3D4D]"
      :class="props.repeatable ? 'w-107' : 'w-58'"
    >
      <span>{{ props.title }}</span>
    </div>
    <div class="flex h-9 w-auto flex-row">
      <div
        v-if="props.repeatable"
        class="bg-[#3E3D4D] px-5 text-[#ABA4FF]"
        :class="styles.textAndIcon"
      >
        <AppIcon name="arrowPath" />
        <span>{{ props.repeatable }}</span>
      </div>
      <div class="bg-[#ABA4FF] px-5 text-[#3E3D4D]" :class="styles.textAndIcon">
        <AppIcon name="clock" />
        <span>{{ props.dueDate }}</span>
      </div>
      <div
        class="bg-[#92D6F3] text-[#314D59]"
        :class="styles.onlyIcon"
        v-if="props.repeatable"
      >
        <AppIcon name="arrowLongRight" />
      </div>
      <div class="bg-[#8CE98C] text-[#274F27]" :class="styles.onlyIcon">
        <AppIcon name="check" />
      </div>
      <div class="bg-[#E27575] text-[#4F2929]" :class="styles.onlyIcon">
        <AppIcon name="trash" />
      </div>
    </div>
  </div>
</template>
