<script setup lang="ts">
  import RegularButton from "@/components/buttons/RegularButton.vue";

  const emits = defineEmits();
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-[#8276FF]">
    <input
      placeholder="Enter a task"
      class="h-9 w-full px-4 text-[#808080] outline-none"
    />
    <hr class="h-px border-none bg-[#8276FF]" />
    <div class="flex flex-row">
      <RegularButton
        label="not repeatable"
        icon="arrowPath"
        class="h-9 w-full rounded-none border-r"
      />
      <RegularButton
        label="<time>"
        class="w-full rounded-none"
        icon="calendar"
      />
    </div>
  </div>
</template>
