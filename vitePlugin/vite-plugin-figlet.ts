import type { Plugin } from 'vite'
import figlet from 'figlet'

export default function figletPlugin({
  text = 'Hello',
  url = '',
  author = '',
}): Plugin {
  return {
    name: 'vite-plugin-figlet',
    transformIndexHtml(html) {
      const ascii = figlet.textSync(text)
      // 直接把 %c 和 ASCII 一起 stringify，避免语法错误
      const safeLog = JSON.stringify(`%c\n${ascii}`)
      return html.replace(
        /<head>/i,
        `<head>\n<script>\nconsole.log(${safeLog}, 'color: #4f46e5; font-family: monospace', ' 😄 ${url}', ' ✍️ ${author}');\n<\/script>`,
      )
    },
  }
}
