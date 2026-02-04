<script setup lang="ts">
  import TimeInput from "@/components/atoms/TimeInput.vue";
  import { ref, watch } from "vue";

  const emit = defineEmits<{
    (e: "toggle-time", value: boolean): void;
    (e: "take-hours-and-minutes", value: [string, string]): void;
  }>();

  const hours = ref<string>("00");
  const minutes = ref<string>("00");

  watch([hours, minutes], ([newHours, newMinutes]) => {
    newHours = newHours.replace(/[^0-9]/g, "");
    newMinutes = newMinutes.replace(/[^0-9]/g, "");
    if (newHours.length === 1) newHours = "0" + newHours;
    else if (newHours === "" || newHours === "0") newHours = "00";
    else if (Number(newHours) > 23) newHours = "23";
    if (newMinutes.length === 1) newMinutes = "0" + newMinutes;
    else if (newMinutes === "" || newMinutes === "0") newMinutes = "00";
    else if (Number(newMinutes) > 59) newMinutes = "59";
    emit("take-hours-and-minutes", [newHours, newMinutes] as [string, string]);
  });
</script>

<template>
  <div>
    <div
      class="fixed inset-0 z-30 bg-black/20"
      @click="emit('toggle-time', false)"
    />
    <div
      class="absolute bottom-full left-1/2 z-40 mb-2 flex -translate-x-6/7 flex-row items-center justify-items-center gap-4 rounded-lg bg-white p-4 shadow-lg shadow-[#8276FF]/50 md:-translate-x-1/2"
    >
      <TimeInput placeholder="hh" :max="23" v-model="hours" />
      <span>:</span>
      <TimeInput placeholder="mm" :max="59" v-model="minutes" />
    </div>
  </div>
</template>
