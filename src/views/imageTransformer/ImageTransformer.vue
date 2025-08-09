<script setup lang="ts">
import { aliyunImageStyleTransformerApi } from '~/api'
import { useAliyunGeneration } from '~/composables/useAlitunGeneration'

const { t } = useI18n()

const formSchema = computed<FormSchemaType[]>(() => [
  {
    label: t('app.form.imageTransformer.fileUpload.label'),
    name: 'image_url',
    type: 'image-upload',
    rules: 'required',
  },
  {
    label: t('app.form.imageTransformer.styleSelect.label'),
    name: 'style_index',
    type: 'select',
    rules: 'required',
    placeholder: t('app.form.imageTransformer.styleSelect.placeholder'),
    options: [
      { label: '参考上传图像风格', value: -1 },
      { label: '复古漫画', value: 0 },
      { label: '3D童话', value: 1 },
      { label: '二次元', value: 2 },
      { label: '小清新', value: 3 },
      { label: '未来科技', value: 4 },
      { label: '国画古风', value: 5 },
      { label: '将军百战', value: 6 },
      { label: '炫彩卡通', value: 7 },
      { label: '清雅国风', value: 8 },
      { label: '喜迎新年', value: 9 },
    ],
  },
  {
    label: t('app.form.imageTransformer.reffileUpload.label'),
    name: 'style_ref_url',
    type: 'image-upload',
    rules: 'required',
    ifFn(formData) {
      return formData.style_index === -1
    },
  },
])

const { exceuteTask, task_result, isActive } = useAliyunGeneration()

async function handleSubmit(data: any) {
  exceuteTask(data, aliyunImageStyleTransformerApi)
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ t('app.form.imageTransformer.title') }}</CardTitle>
      <CardDescription>{{ t('app.form.imageTransformer.description') }}</CardDescription>
    </CardHeader>
    <CardContent>
      <form-config :form-schema="formSchema" :loading="isActive" @submit="handleSubmit" />
      <img v-if="task_result.success" :src="task_result.url" alt="transformed image" class="mt-4 rounded-sm">
    </CardContent>
  </Card>
</template>

<style scoped></style>
