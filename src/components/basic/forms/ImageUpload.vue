<!-- 图片上传组件 -->
<script setup lang="ts">
import { mockUploadImage } from '~/api/mock'

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const isUploading = ref(false)

const imageUrl = ref('')

function handleFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file)
    return
  const reader = new FileReader()
  reader.onload = async (ev) => {
    const base64 = ev.target?.result as string
    imageUrl.value = base64
    isUploading.value = true
    // TODO: modify this to use a real API
    const url = await mockUploadImage()
    emits('update:modelValue', url)
    emits('change', url)
    isUploading.value = false
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div>
    <div>
      <label for="image-upload" class="inline-block w-[120px] aspect-square cursor-pointer box-content leading-[120px] text-3xl text-center border-[1px] border-foreground rounded-md">
        <span v-if="!imageUrl" class="icon-[ic--baseline-plus]" />
        <img v-else :src="imageUrl" class="w-full h-full object-cover rounded-md">
      </label>
      <input id="image-upload" type="file" class="hidden" accept="image/*" @change="handleFileChange">
      <br>
      <small v-show="isUploading" class="text-[var(--primary)]">uploading...</small>
    </div>
  </div>
</template>

<style scoped>
</style>
