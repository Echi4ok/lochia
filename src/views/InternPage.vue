<script setup lang="ts">
import Table from '@/components/Table.vue';
import { useInternStore, type Intern } from '@/stores/internships';

const internStore = useInternStore();


</script>

<template>
  <div>
    <Table :items = "internStore.internsArr"/>
  </div>
</template>

<style scoped>

</style>