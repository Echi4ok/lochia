<script setup lang="ts">
import Table from '@/components/Table.vue';
import { useInternStore } from '@/stores/internships';

const internStore = useInternStore();


</script>

<template>
  <div>
    <Table :items = "internStore.internsArr" store-type="internship"/>
  </div>
</template>

<style scoped>

</style>