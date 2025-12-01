'use client'

import { cls } from '@/utils/cls'
import { useSize } from 'ahooks'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

const navs = [
  { href: '/', label: '修正' },
  { href: '/templates', label: 'テンプレート' },
  { href: '/to-written', label: '生成' },
  { href: '/about', label: 'についてです' },
]

export default function TopHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const size = useSize(ref)
  const pathname = usePathname()

  return (
    <>
      <header
        ref={ref}
        className="bg-background fixed top-0 right-0 left-0 flex items-center border-b border-gray-200 p-4 text-gray-900"
      >
        <div className="flex w-1/4">
          <Link href="/" className="flex items-center text-2xl font-bold">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <span className="ui-font-miniday">Keigo AI</span>
          </Link>
        </div>

        <nav className="flex w-1/2 items-center justify-center gap-8">
          {navs.map((item) => (
            <Link
              key={item.href}
              replace
              href={item.href}
              className={cls(
                'border-b-2 text-lg transition-all',
                item.href === pathname
                  ? 'border-gray-800 font-bold'
                  : 'border-transparent font-medium hover:border-gray-500',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <i className="w-1/4"></i>
      </header>

      <div style={{ height: size?.height }}></div>
    </>
  )
}
