<script setup lang="ts">
import * as z from 'zod'
import { aliyunImageStyleTransformerApi, getResultByTaskId } from '~/api'

const { t } = useI18n()

const formSchema = computed<FormSchemaType[]>(() => [
  {
    label: t('app.form.imageTransformer.fileUpload.label'),
    name: 'image_url',
    type: 'image-upload',
    rule: z.string(t('app.form.imageTransformer.fileUpload.message')),
  },
  {
    label: t('app.form.imageTransformer.styleSelect.label'),
    name: 'style_index',
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
  {
    label: t('app.form.imageTransformer.reffileUpload.label'),
    name: 'style_ref_url',
    type: 'image-upload',
    rule: z.string(t('app.form.imageTransformer.reffileUpload.message')),
    ifFn(formData) {
      return formData.style_index === -1
    },
  },
])

// 任务ID
const task_id = ref<string>('c324cbf3-cd59-44d2-8fcf-f97a40a29d7b')
// 任务结果内容
const task_result = ref<string>('')

// 轮询获得任务结果
const { resume: run, pause, isActive } = useIntervalFn(async () => {
  if (task_id.value) {
    const data = await getResultByTaskId(task_id.value)
    if (data.output.task_status === 'SUCCEEDED') {
      task_result.value = data.output.results[0].url
      pause()
    }
    else if (data.output.task_status === 'FAILED') {
      task_result.value = '任务失败'
      pause()
    }
  }
}, 1000, {
  immediate: false,
})

async function handleSubmit(data: any) {
  const res = await aliyunImageStyleTransformerApi(data)
  if (res.output.task_id) {
    task_id.value = res.output.task_id
    run()
  }
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
      <img v-if="task_result" :src="task_result" alt="transformed image" class="mt-4 rounded-sm">
    </CardContent>
  </Card>
</template>

<style scoped></style>
