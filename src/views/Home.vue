<script setup lang="ts">
import { toast } from 'vue-sonner'

useTitle('Home')
</script>

<template>
  <div>
    <Button
      @click="() => {
        toast.success('hello world')
      }"
    >
      hello world
    </Button>
  </div>
</template>

<style scoped>

</style>
