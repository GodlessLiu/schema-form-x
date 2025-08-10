import type { CreateTaskResponse, TaskStatus } from '~/api/types'
import { getResultByTaskId } from '~/api'

interface TaskResult<T> {
  response: T
  status: TaskStatus
}

export function useAliyunGeneration<T>() {
  // 任务ID
  const task_id = ref<string>('')
  // 任务结果内容
  const task_result = reactive<TaskResult<T>>({
    response: {} as T,
    status: undefined,
  })
  // 任务状态
  const isLoading = ref<boolean>(false)

  // 轮询获得任务结果
  const { resume, pause } = useIntervalFn(async () => {
    if (task_id.value) {
      const data = await getResultByTaskId(task_id.value)
      const status = data.output.task_status!
      if (['FAILED', 'SUCCEEDED'].includes(status)) {
        // @ts-expect-error Let me do it!!
        task_result.response = data as T
        task_result.status = status
        isLoading.value = false
        pause()
      }
      else if (status === 'RUNNING') {
        task_result.status = status
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
      task_result.status = 'RUNNING'
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
