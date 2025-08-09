<!-- 图片上传组件 -->
<script setup lang="ts">
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const width = ref(1024)
const height = ref(1024)

watch([width, height], ([newWidth, newHeight]) => {
  emits('update:modelValue', `${newWidth}*${newHeight}`)
  emits('change', `${newWidth}*${newHeight}`)
})
</script>

<template>
  <div class="flex gap-2 text-xl items-center">
    <NumberField class="w-[80px]" :model-value="width" @update:model-value="width = $event">
      <NumberFieldContent>
        <NumberFieldInput />
      </NumberFieldContent>
    </NumberField>
    x
    <NumberField class="w-[80px]" :model-value="height" @update:model-value="height = $event">
      <NumberFieldContent>
        <NumberFieldInput />
      </NumberFieldContent>
    </NumberField>
  </div>
</template>

<style scoped></style>
