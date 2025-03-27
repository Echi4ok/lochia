<script setup lang="ts">
import Table from '@/components/Table.vue';
import { useCandidatesStore, type Candidate } from '@/stores/candidates';

const candidatesStore = useCandidatesStore();


</script>

<template>
  <div>
    <Table :items = "candidatesStore.candidatesArr"/>
  </div>
</template>

<style scoped>

</style>