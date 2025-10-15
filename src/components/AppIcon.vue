<script setup lang="ts">
import HomeIcon from "@/components/icons/Home.vue";
import HistoryIcon from "@/components/icons/History.vue";
import BinIcon from "@/components/icons/Bin.vue";

import type { IconName } from "@/routes/routes";

const props = defineProps<{
  name: IconName;
  class?: string;
}>();

const icons: Record<IconName, any> = {
  home: HomeIcon,
  history: HistoryIcon,
  bin: BinIcon,
};
</script>

<template>
  <component :is="icons[props.name]" :class="props.class" />
</template>
