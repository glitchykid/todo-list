<script setup lang="ts">
import { ref, computed } from "vue";
import RegularButton from "@/components/buttons/RegularButton.vue";

interface buttons {
  name: string;
  label: string;
  active: boolean;
}

const activeButton = ref("today");

const buttons: buttons[] = [
  {
    name: "today",
    label: "Today",
    active: true,
  },
  {
    name: "tomorrow",
    label: "Tomorrow",
    active: false,
  },
  {
    name: "select",
    label: "Select a date...",
    active: false,
  },
];
// fix this
const date = computed(() => {
  const today: Date = new Date();
  if (activeButton.value === "today") {
    return today.toLocaleDateString();
  } else if (activeButton.value === "tomorrow") {
    const tomorrow: Date = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toLocaleDateString();
  }
  return "Select a date...";
});
</script>

<template>
  <main
    class="bg-white w-full h-full gap-8 px-9 py-8 border-1 border-[#C9D7ED] rounded-[16px]"
  >
    <div class="flex flex-col w-full gap-8">
      <h6 class="text-[#D0CCFF] text-center">All tasks</h6>
      <div class="flex flex-row items-center justify-between">
        <div class="flex flex-row gap-8">
          <RegularButton
            v-for="button in buttons"
            :key="button.name"
            :name="button.name"
            :label="button.label"
            :active="activeButton === button.name"
            :border="true"
            @click="activeButton = button.name"
          />
        </div>
        <span class="text-[#D0CCFF] font-bold text-right">
          {{ date }}
        </span>
      </div>
    </div>
  </main>
  <aside
    class="bg-white min-w-50 w-50 h-full py-8 flex flex-col gap-8 border-1 border-[#C9D7ED] rounded-[16px]"
  >
    <div>
      <h6 class="text-[#D0CCFF] text-center">Spaces</h6>
    </div>
  </aside>
</template>
