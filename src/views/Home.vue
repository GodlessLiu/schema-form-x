<script setup lang="ts">
import { toast } from 'vue-sonner'

const { t } = useI18n()

useHead(() => ({
  title: t('app.title'),
}))
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
