<script setup lang="ts">
import Table from '@/components/Table.vue';
import { useCandidatesStore} from '@/stores/candidates';

const candidatesStore = useCandidatesStore();


</script>

<template>
  <div>
    <Table :items = "candidatesStore.candidatesArr" store-type="candidate"/>
  </div>
</template>

<style scoped>

</style>