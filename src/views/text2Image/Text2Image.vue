<script setup lang="ts">
import type { Text2ImageResponse } from '~/api/types'
import { aliyunTextGenerationImageApi } from '~/api/text_generation_image'
import { useAliyunGeneration } from '~/composables/useAlitunGeneration'

const { t } = useI18n()

const formSchema = computed<FormSchemaType[]>(() => [
  {
    label: t('app.form.text2Image.prompt.label'),
    name: 'prompt',
    type: 'textarea',
    rules: 'required',
    defaultValue: '',
  },
  {
    label: t('app.form.text2Image.nagetivePrompt.label'),
    name: 'negative_prompt',
    type: 'textarea',
    defaultValue: '',
  },
  {
    label: t('app.form.text2Image.sizes.label'),
    name: 'sizes',
    type: 'sizes',
    defaultValue: '1024*1024',
  },
  {
    label: t('app.form.text2Image.n.label'),
    name: 'n',
    type: 'number-field',
    min: 1,
    max: 4,
    defaultValue: 4,
  },
  {
    label: t('app.form.text2Image.seed.label'),
    name: 'seed',
    type: 'number-field',
    min: 0,
    max: 2147483647,
    defaultValue: 99,
  },
  {
    label: t('app.form.text2Image.prompt_extend.label'),
    name: 'prompt_extend',
    type: 'select',
    defaultValue: true,
    options: [
      {
        label: '开启',
        value: true,
      },
      {
        label: '关闭',
        value: false,
      },
    ],
  },
  {
    label: t('app.form.text2Image.watermark.label'),
    name: 'watermark',
    type: 'select',
    defaultValue: false,
    options: [
      {
        label: '开启',
        value: true,
      },
      {
        label: '关闭',
        value: false,
      },
    ],
  },
])

const { task_result, isLoading, exceuteTask } = useAliyunGeneration<Text2ImageResponse>()

function handleSubmit(data: any) {
  exceuteTask(data, aliyunTextGenerationImageApi)
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ t('app.form.text2Image.title') }}</CardTitle>
      <CardDescription>{{ t('app.form.text2Image.description') }}</CardDescription>
    </CardHeader>
    <CardContent>
      <form-config :form-schema="formSchema" :loading="isLoading" @submit="handleSubmit" />
      <div v-if="task_result.success" class="grid grid-cols-2 gap-4 mt-10">
        <img
          v-for="item in task_result.response.output.results" :key="item.url" :src="item.url" alt="image"
          class="rounded-md"
        >
      </div>
    </CardContent>
  </Card>
</template>

<style scoped></style>
