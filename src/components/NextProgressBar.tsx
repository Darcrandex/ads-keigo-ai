'use client'
import { ThemeConfig } from '@/config'
import { ProgressProvider } from '@bprogress/next/app'
import { PropsWithChildren } from 'react'

export default function NextProgressBar(props: PropsWithChildren) {
  return (
    <ProgressProvider height="4px" color={ThemeConfig.primaryColor} options={{ showSpinner: false }} shallowRouting>
      {props.children}
    </ProgressProvider>
  )
}
