<script setup lang="ts">
  import { watch } from "vue";
  const checkedTasks = defineModel<string[]>("checkedTasks");

  const props = defineProps<{
    id: string;
    title: string;
    selectAll: boolean;
  }>();

  watch(
    () => props.selectAll,
    (newSelectAll) => {
      if (newSelectAll && checkedTasks.value) {
        checkedTasks.value.push(props.id);
      } else if (!newSelectAll && checkedTasks.value) checkedTasks.value = [];
    },
  ); // fix
</script>

<template>
  <input type="checkbox" :value="props.id" v-model="checkedTasks" />
</template>
