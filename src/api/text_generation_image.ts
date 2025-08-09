import type { CreateTaskResponse, TextGenerationImageRequest } from './types'
import http from '~/lib/http'

export function aliyunTextGenerationImageApi(query: TextGenerationImageRequest): Promise<CreateTaskResponse> {
  return http.post('/aliyun-api/v1/services/aigc/text2image/image-synthesis', {
    model: 'wanx2.1-t2i-plus',
    input: {
      prompt: query.prompt,
    },
    parameters: {
      size: query.size,
      n: query.n,
      seed: query.seed,
      prompt_extend: query.prompt_extend,
      watermark: query.watermark,
    },
  }, {
    headers: {
      'X-DashScope-Async': 'enable',
      'Authorization': `Bearer ${import.meta.env.VITE_ALIYUN_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
}
