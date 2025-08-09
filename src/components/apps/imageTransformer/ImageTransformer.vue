<script setup lang="ts">
import * as z from 'zod'

const { t } = useI18n()

const formSchema = computed<FormSchemaType[]>(() => [
  {
    label: t('app.form.imageTransformer.fileUpload.label'),
    name: 'file',
    type: 'image-upload',
    rule: z.string(t('app.form.imageTransformer.fileUpload.message')),
  },
  {
    label: t('app.form.imageTransformer.styleSelect.label'),
    name: 'type',
    type: 'select',
    rule: z.number(t('app.form.imageTransformer.styleSelect.message')),
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
])

function handleSubmit(data: any) {
  console.log(data)
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ t('app.form.imageTransformer.title') }}</CardTitle>
      <CardDescription>{{ t('app.form.imageTransformer.description') }}</CardDescription>
    </CardHeader>
    <CardContent>
      <form-config :form-schema="formSchema" @submit="handleSubmit" />
    </CardContent>
  </Card>
</template>

<style scoped>

</style>
