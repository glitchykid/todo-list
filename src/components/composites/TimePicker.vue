<script setup lang="ts">
  import TimeField from "@/components/primitives/TimeField.vue";
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
  <Teleport to="body">
    <Transition name="fade" appear>
      <div
        class="fixed inset-0 z-[90] bg-[var(--color-overlay)]"
        @click="emit('toggle-time', false)"
      />
    </Transition>

    <Transition name="popover" appear>
      <div
        class="fixed top-1/2 left-1/2 z-[100] flex w-[calc(100vw-2rem)] max-w-72 -translate-x-1/2 -translate-y-1/2 flex-row items-center justify-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-[var(--color-text)] shadow-[var(--shadow-soft)]"
      >
        <TimeField placeholder="hh" :max="23" v-model="hours" />
        <span>:</span>
        <TimeField placeholder="mm" :max="59" v-model="minutes" />
      </div>
    </Transition>
  </Teleport>
</template>
