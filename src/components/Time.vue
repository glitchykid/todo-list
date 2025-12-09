<script setup lang="ts">
  import NumericInput from "@/components/inputs/NumericInput.vue";
  import { ref, watch } from "vue";

  const emit = defineEmits<{
    (e: "toggle-time", value: boolean): void;
    (e: "take-hours-and-minutes", value: number[]): void;
  }>();

  const hours = ref<number>(0);
  const minutes = ref<number>(0);

  watch([hours, minutes], ([newHours, newMinutes]) => {
    emit("take-hours-and-minutes", [newHours, newMinutes]);
  });
</script>

<template>
  <div>
    <div
      class="fixed inset-0 z-30 bg-black/20"
      @click="emit('toggle-time', false)"
    />
    <div
      class="absolute justify-items-center items-center mb-2 bottom-full gap-4 rounded-lg p-4 left-1/2 -translate-x-1/2 shadow-lg shadow-[#8276FF]/50 z-40 flex flex-row bg-white"
    >
      <NumericInput
        placeholder="hh"
        :maxlength="2"
        :max="23"
        v-model.number="hours"
      />
      <span>:</span>
      <NumericInput
        placeholder="mm"
        :maxlength="2"
        :max="59"
        v-model.number="minutes"
      />
    </div>
  </div>
</template>
