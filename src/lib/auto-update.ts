let lastSrcs: any // Last obtained script addresses
let needTip = true // Default enable prompt

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
const DURATION = 5 * 60 * 1000 // Check every 5 minutes

export function autoRefresh() {
  setTimeout(async () => {
    const willUpdate = await needUpdate()
    if (willUpdate) {
      // Delayed update to prevent blank page refresh before deployment is complete
      setTimeout(() => {
        alert('Content update detected. To ensure normal functionality, refresh now?')
        location.reload()
      }, 30000)
      needTip = false // Close update prompt to prevent duplicate reminders
    }
    if (needTip) {
      autoRefresh()
    }
  }, DURATION)
}
