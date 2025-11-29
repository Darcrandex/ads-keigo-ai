'use client'

import CopyButton from '@/components/CopyButton'
import TopHeader from '@/components/TopHeader'
import { toneOptions } from '@/constant/common'
import { getSpokenToWrittenPrompt } from '@/constant/prompt'
import { App, Button, Input, Select } from 'antd'
import { useMemo, useState } from 'react'

export default function ToWritten() {
  const [input, setInput] = useState('')
  const [tone, setTone] = useState('1')
  const [result, setResult] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const { notification } = App.useApp()

  const handleGenerate = async () => {
    if (!input?.trim()) return

    try {
      setIsLoading(true)
      const toneItem = toneOptions.find((item) => item.value === tone)
      const text = getSpokenToWrittenPrompt(input, toneItem?.label || '')

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: text }] }),
      })

      const reader = res.body?.getReader()
      const decoder = new TextDecoder('utf-8')
      let assistantMessage = ''

      while (true) {
        const { done, value } = (await reader?.read()) || {}
        if (done) break
        const chunk = decoder.decode(value)
        assistantMessage += chunk
        setResult(assistantMessage)
      }
    } catch (error) {
      console.error('Error:', error)
      notification.error({ title: 'エラー', message: 'エラーが発生しました。もう一度お試しください。' })
    } finally {
      setIsLoading(false)
    }
  }

  const outputRows = useMemo(() => 3 + (result.split('\n').length || 1), [result])

  return (
    <>
      <TopHeader />

      <section className="container mx-auto my-6">
        <Input.TextArea
          className="h-64 w-full rounded-xl border p-3"
          placeholder="例です: 来週の会議は13時に始まります。資料を送ります。相手は昌隆電気の鈴木さんです"
          rows={10}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="my-6 flex items-center justify-between">
          <Select options={toneOptions} value={tone} onChange={setTone} className="w-40" />
          <Button loading={isLoading} onClick={handleGenerate}>
            メールを作成します
          </Button>
        </div>

        {result ? (
          <>
            <Input.TextArea readOnly value={result} rows={outputRows} />

            <div className="my-6">
              <CopyButton text={result} />
            </div>
          </>
        ) : null}
      </section>
    </>
  )
}
