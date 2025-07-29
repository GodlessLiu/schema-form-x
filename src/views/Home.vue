<script setup lang="ts">
import { toast } from 'vue-sonner'
</script>

<template>
  <div>
    <Button
      @click="() => {
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
        });
      }"
    >
      hello
    </Button>
  </div>
</template>
