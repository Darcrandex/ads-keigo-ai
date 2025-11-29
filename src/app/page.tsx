'use client'

import React, { useState } from 'react'

export enum RoleType {
  USER = 'user',
  ASSISTANT = 'assistant'
}

export type MessageItem = {
  role: RoleType
  content: string
}

const toneOptions = [
  {
    value: 'business',
    label: 'ビジネス敬語'
  },
  {
    value: 'polite',
    label: '丁寧語'
  },
  {
    value: 'casual',
    label: 'カジュアル'
  }
]

export default function KeigoAIPrototype() {
  const [input, setInput] = useState('')
  const [tone, setTone] = useState('business')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!input?.trim()) return

    try {
      setIsLoading(true)
      const toneItem = toneOptions.find((item) => item.value === tone)
      const text = `请将以下文本内容按日语"${toneItem?.label}"语气风格进行转换：${input}`

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: RoleType.USER, content: text }] })
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col gap-6 text-gray-900">
      <h1 className="text-3xl font-bold">Keigo-AI 原型界面</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">入力エリア（文章入力）</h2>
          <textarea
            className="border rounded-xl p-3 w-full h-64"
            placeholder="ここに文章を入力してください..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <label className="font-medium">文体選択：</label>
            <select className="border rounded-xl p-2" value={tone} onChange={(e) => setTone(e.target.value)}>
              {toneOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleGenerate} className="bg-blue-600 text-white p-3 rounded-xl shadow hover:bg-blue-700">
            敬語に変換する
          </button>
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">生成結果</h2>
          <div className="border rounded-xl p-3 whitespace-pre-wrap h-64 overflow-y-auto">
            {result || 'ここに生成結果が表示されます'}
          </div>
        </div>
      </div>
    </div>
  )
}
