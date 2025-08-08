<script setup lang="ts">
import * as z from 'zod'

const formSchema: FormSchemaType[] = [
  {
    label: '上传文件',
    name: 'file',
    type: 'image-upload',
    rule: z.string(),
  },
  {
    label: '风格',
    name: 'type',
    type: 'select',
    rule: z.number(),
    placeholder: '请选择风格',
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
]

function handleSubmit(data: any) {
  console.log(data)
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>图像风格迁移</CardTitle>
      <CardDescription>根据用户提供原始图片，再选择自己想要的风格，就可以生成其他不同类型的图像</CardDescription>
    </CardHeader>
    <CardContent>
      <form-config :form-schema="formSchema" @submit="handleSubmit" />
    </CardContent>
  </Card>
</template>

<style scoped>

</style>
