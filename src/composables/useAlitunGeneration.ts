import type { CreateTaskResponse } from '~/api/types'
import { toast } from 'vue-sonner'
import { getResultByTaskId } from '~/api'

interface TaskResult<T> {
  response: T
  success: boolean
}

export function useAliyunGeneration<T>() {
  const { t } = useI18n()
  // 任务ID
  const task_id = ref<string>('')
  // 任务结果内容
  const task_result = reactive<TaskResult<T>>({
    response: {} as T,
    success: false,
  })
  // 任务状态
  const isLoading = ref<boolean>(false)

  // 轮询获得任务结果
  const { resume, pause } = useIntervalFn(async () => {
    if (task_id.value) {
      const data = await getResultByTaskId(task_id.value)
      if (data.output.task_status === 'SUCCEEDED') {
        // @ts-expect-error Let me do it!!
        task_result.response = data as T
        task_result.success = true
        isLoading.value = false
        pause()
      }
      else if (data.output.task_status === 'FAILED') {
        task_result.success = false
        toast.error(t('app.global.excuteError'))
        isLoading.value = false
        pause()
      }
    }
  }, 1000, {
    immediate: false,
  })

  // 执行任务
  async function exceuteTask(data: any, task: (data: any) => Promise<CreateTaskResponse>) {
    isLoading.value = true
    const { output } = await task(data)
    const id = output.task_id
    if (id) {
      task_id.value = id
      resume()
      return true
    }
    return false
  }

  return {
    isLoading,
    task_result,
    exceuteTask,
  }
}
