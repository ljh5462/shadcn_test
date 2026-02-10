'use client'

import { Menu } from 'lucide-react'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { ThemeSwitch } from './common/theme-switch'

export function Header() {
  const { toggleSidebar, open } = useSidebar()

  return (
    <header className="z-100 flex h-16 w-full items-center justify-between bg-background px-6 shrink-0 border-none transition-colors duration-300">
      <div className="flex items-center gap-4">
        {/* 커스텀 ≡ 아이콘 버튼 */}
        {/* 🌸 커스텀 트리거 버튼 */}
        <button
          onClick={toggleSidebar}
          className={cn(
            'p-2 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer'
          )}
          aria-label="Toggle Sidebar">
          {/* 회전 애니메이션 핵심:
            - duration-700: 회전 속도를 적당히 여유 있게 설정
            - ease-in-out: 부드러운 가감속
            - rotate-[360deg]: 열릴 때 한 바퀴 회전
          */}
          <span className="text-2xl inline-block transition-all duration-700 ease-in-out hover:rotate-[360deg]">
            🌸
          </span>
        </button>

        <div className="h-4 w-[1px] bg-muted-foreground/30" />
        <span className="text-xs font-bold text-muted-foreground tracking-[0.2em] uppercase">
          Admin Portal
        </span>
      </div>

      {/* 우측 유틸리티 영역 */}
      <div className="flex items-center gap-3">
        <ThemeSwitch />
      </div>
    </header>
  )
}
