<script setup lang="ts">
import HomeIcon from "@/components/icons/Home.vue";
import HistoryIcon from "@/components/icons/History.vue";
import BinIcon from "@/components/icons/Bin.vue";
import ChevronDown from "./icons/ChevronDown.vue";

import type { RouteIcon } from "@/routes/routes";

type RegularIcon = "chevronDown";

const props = defineProps<{
  name: RouteIcon | RegularIcon;
  class?: string;
}>();

const icons: Record<RouteIcon | RegularIcon, any> = {
  home: HomeIcon,
  history: HistoryIcon,
  bin: BinIcon,
  chevronDown: ChevronDown,
};
</script>

<template>
  <component :is="icons[props.name]" :class="props.class" />
</template>
