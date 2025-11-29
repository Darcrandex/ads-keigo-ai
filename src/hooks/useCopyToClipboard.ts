import { useCallback, useState } from 'react'

export type CopyStatus = 'copying' | 'success' | 'error' | 'ready'

export const useCopyToClipboard = ({ duration = 3000 } = {}) => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('ready')

  // 核心复制函数（对外暴露）
  const copyToClipboard = useCallback(
    async (text: string) => {
      if (typeof text !== 'string' || text.trim() === '') {
        setCopyStatus('error')
        setTimeout(() => setCopyStatus('ready'), duration)
        console.error('复制失败：文本不能为空且必须是字符串')
        return
      }

      setCopyStatus('copying') // 标记复制中状态

      try {
        // 优先使用现代浏览器 Clipboard API
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text)
        } else {
          throw new Error('浏览器不支持复制 API，且未启用降级方案')
        }

        // 复制成功
        setCopyStatus('success')
      } catch (err) {
        // 复制失败
        setCopyStatus('error')
        console.error('复制失败：', err)
      } finally {
        // 定时清除状态提示
        setTimeout(() => setCopyStatus('ready'), duration)
      }
    },
    [duration],
  )

  return [copyStatus, copyToClipboard] as const
}
