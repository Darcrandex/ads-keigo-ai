import AntdProvider from '@/components/AntdProvider'
import NextProgressBar from '@/components/NextProgressBar'
import '@radix-ui/themes/styles.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { PropsWithChildren, Suspense } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Keigo-AI 日本語ビジネス文書AI',
  description: '敬語変換、メール整形、自動文書作成がワンクリック。',
  keywords: ['敬語', 'メール', 'ビジネス文書', 'AI'],
}

// SEO优化
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Keigo-AI',
  url: 'https://keigo-ai.com',
  description: '敬語変換・メール整形・ビジネス文章作成を自動化するAIツール。',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  inLanguage: 'ja',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
  },
}

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="ja">
      <Script
        id="json-ld-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1452826005780486"
        crossOrigin="anonymous"
      ></Script>

      <body className="bg-background">
        <Suspense fallback={null}>
          <AntdProvider>{props.children}</AntdProvider>
          <NextProgressBar />
        </Suspense>
      </body>
    </html>
  )
}
