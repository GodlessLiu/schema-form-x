import type { CreateTaskResponse, ImageTransformerRequest, ImageTransformerResponse } from './types'
import http from '~/lib/http'

/**
 * 创建任务获取任务ID
 * @param url  图像url地址
 * @param style_index 人像风格类型索引值
 * @returns Promise<CreateTaskResponse>
 */
export function aliyunImageStyleTransformerApi(input: ImageTransformerRequest): Promise<CreateTaskResponse> {
  return http.post('/aliyun-api/v1/services/aigc/image-generation/generation', {
    model: 'wanx-style-repaint-v1',
    input,
  }, {
    headers: {
      'X-DashScope-Async': 'enable',
      'Authorization': `Bearer ${import.meta.env.VITE_ALIYUN_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
}
/**
 * 根据任务ID查询结果
 * @param task_id 任务ID
 * @returns Promise<ImageTransformerResponse>
 */
export function getResultByTaskId(task_id: string): Promise<ImageTransformerResponse> {
  return http.get(`/aliyun-api/v1/tasks/${task_id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ALIYUN_API_KEY}`,
    },
  })
}
