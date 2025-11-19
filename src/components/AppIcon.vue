<script setup lang="ts">
  import HomeIcon from "@/components/icons/Home.vue";
  import HistoryIcon from "@/components/icons/History.vue";
  import BinIcon from "@/components/icons/Bin.vue";
  import ChevronDown from "@/components/icons/ChevronDown.vue";
  import ArrowLongRight from "@/components/icons/ArrowLongRight.vue";
  import Check from "@/components/icons/Check.vue";
  import ArrowPath from "@/components/icons/ArrowPath.vue";
  import Clock from "@/components/icons/Clock.vue";

  import type { RouteIcon } from "@/routes/routes";
  import Trash from "./icons/Trash.vue";

  type RegularIcon =
    | "chevronDown"
    | "arrowLongRight"
    | "check"
    | "trash"
    | "arrowPath"
    | "clock";

  const props = defineProps<{
    name: RouteIcon | RegularIcon;
    class?: string;
  }>();

  const icons: Record<RouteIcon | RegularIcon, any> = {
    home: HomeIcon,
    history: HistoryIcon,
    bin: BinIcon,
    chevronDown: ChevronDown,
    arrowLongRight: ArrowLongRight,
    check: Check,
    trash: Trash,
    arrowPath: ArrowPath,
    clock: Clock,
  };
</script>

<template>
  <component :is="icons[props.name]" :class="props.class" />
</template>
