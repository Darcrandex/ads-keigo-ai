'use client'

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { Button } from 'antd'

export default function CopyButton(props: { text: string }) {
  const [copyStatus, copyToClipboard] = useCopyToClipboard()

  return (
    <Button disabled={copyStatus !== 'ready'} onClick={() => copyToClipboard(props.text)}>
      {copyStatus === 'ready' ? '結果をコピーする' : null}
      {copyStatus === 'success' ? 'コピー成功' : null}
      {copyStatus === 'error' ? 'コピー失敗' : null}
      {copyStatus === 'copying' ? 'コピー中...' : null}
    </Button>
  )
}
