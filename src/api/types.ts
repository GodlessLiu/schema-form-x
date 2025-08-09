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
