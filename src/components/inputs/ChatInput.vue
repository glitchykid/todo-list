<script setup lang="ts">
  import RegularButton from "@/components/buttons/RegularButton.vue";
  import Repeatable from "@/components/Repeatable.vue";
  import Time from "@/components/Time.vue";
  import { ArrowPathIcon, ClockIcon } from "@heroicons/vue/20/solid";
  import { reactive, ref } from "vue";

  const showTime = ref<Boolean>(false);
  const showTypesOfRepeat = ref<Boolean>(false);

  const time = reactive({
    hours: 0,
    minutes: 0,
  });

  const toggleTime = () => {
    showTime.value = !showTime.value;
  };

  const toggleTypesOfRepeat = () => {
    showTypesOfRepeat.value = !showTypesOfRepeat.value;
  };
</script>

<template>
  <div class="rounded-lg border border-[#8276FF]">
    <input
      placeholder="Enter a task"
      class="h-9 w-full px-4 text-[#3E3D4D] outline-none"
    />
    <hr class="h-px border-none bg-[#8276FF]" />
    <div class="flex h-9 flex-row">
      <div class="relative w-full rounded-bl-lg">
        <RegularButton
          label="not repeatable"
          class="w-full h-full rounded-none rounded-bl-lg border-r"
          :icon="ArrowPathIcon"
          :active="showTypesOfRepeat"
          @click="toggleTypesOfRepeat"
        />
        <Repeatable
          v-if="showTypesOfRepeat"
          @toggle-types-of-repeat="showTypesOfRepeat = $event"
        />
      </div>
      <div class="relative w-full rounded-br-lg">
        <RegularButton
          :label="`${time.hours}:${time.minutes}`"
          class="h-full w-full rounded-none rounded-br-lg"
          :icon="ClockIcon"
          :active="showTime"
          @click="toggleTime"
        />
        <Time
          v-if="showTime"
          @toggle-time="showTime = $event"
          v-model="(time.hours, time.minutes)"
        />
      </div>
    </div>
  </div>
</template>
