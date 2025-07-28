let lastSrcs: any // 上一次获取到的script地址
let needTip = true // 默认开启提示

const scriptReg = /<script.*src=["'](?<src>[^"']+)/g

async function extractNewScripts() {
  const html = await fetch(`/?_timestamp=${Date.now()}`).then(resp => resp.text())
  scriptReg.lastIndex = 0

  const result: string[] = []
  const match: RegExpExecArray = scriptReg.exec(html)!
  result.push(match.groups!.src)
  return result
}

async function needUpdate() {
  const newScripts = await extractNewScripts()
  if (!lastSrcs) {
    lastSrcs = newScripts
    return false
  }
  let result = false
  if (lastSrcs.length !== newScripts.length) {
    result = true
  }
  for (let i = 0; i < lastSrcs.length; i++) {
    if (lastSrcs[i] !== newScripts[i]) {
      result = true
      break
    }
  }
  lastSrcs = newScripts
  return result
}
const DURATION = 5 * 60 * 1000 // 5分钟检查一次

export function autoRefresh() {
  setTimeout(async () => {
    const willUpdate = await needUpdate()
    if (willUpdate) {
      // 延时更新，防止部署未完成用户就刷新空白
      setTimeout(() => {
        alert('检测到页面有内容更新，为了功能的正常使用，是否立即刷新?')
        location.reload()
      }, 30000)
      needTip = false // 关闭更新提示，防止重复提醒
    }
    if (needTip) {
      autoRefresh()
    }
  }, DURATION)
}
