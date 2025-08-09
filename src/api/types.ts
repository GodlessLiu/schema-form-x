export interface ImageTransformerRequest {
  style_index: number
  image_url: string
  style_ref_url?: string
}

interface ImageTransformerResult {
  url: string
}

interface ImageTransformerOutput {
  task_id: string
  task_status: 'RUNNING' | 'FAILED' | 'SUCCEEDED'
  submit_time: string
  scheduled_time: string
  end_time: string
  error_message: string
  start_time: string
  style_index: number
  error_code: number
  results: ImageTransformerResult[]
}

export interface ImageTransformerResponse {
  request_id: string
  output: ImageTransformerOutput
  usage: {
    image_count: number
  }
}
interface CreateTaskSuccessResponse {
  output: {
    task_id: string
    task_status: 'PENDING' | 'RUNNING' | 'SUSPENDED' | 'SUCCEEDED' | 'FAILED' | 'UNKNOWN  '
  }
  request_id: string
  code: string
  message: string
}

interface CreateTaskFaildResponse {
  code: 'InvalidApiKey'
  message: 'Invalid API key'
  request_id: string
}

export type CreateTaskResponse = CreateTaskSuccessResponse & CreateTaskFaildResponse

export interface TextGenerationImageRequest {
  prompt: string
  size: string
  n: number
  seed?: number
  prompt_extend: boolean
  watermark: boolean
}

export interface Text2ImageItemResult {
  orig_prompt: string
  actual_prompt: string
  url: string
}

export interface TaskMetrics {
  TOTAL: number
  SUCCEEDED: number
  FAILED: number
}

export interface Text2ImageOutput {
  task_id: string
  task_status: string // 可改为联合类型：'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED'
  submit_time: string
  scheduled_time: string
  end_time: string
  results: Text2ImageItemResult[]
  task_metrics: TaskMetrics
}

export interface Text2ImageUsage {
  image_count: number
}

export interface Text2ImageResponse {
  request_id: string
  output: Text2ImageOutput
  usage: Text2ImageUsage
}
