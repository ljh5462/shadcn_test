'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted)
    return <div className="w-[50px] h-[26px] bg-muted rounded-full" />

  const isDark = resolvedTheme === 'dark'

  return (
    <div className="relative inline-flex items-center group">
      {/* 1. 낮 아이콘: 해가 지는 애니메이션 (아래로 내려가며 사라짐) */}
      <div
        className={cn(
          'absolute left-1.5 z-10 transition-all duration-500 ease-in-out pointer-events-none',
          isDark
            ? 'opacity-0 translate-y-2 scale-50 -rotate-12'
            : 'opacity-100 translate-y-0 scale-100 rotate-0'
        )}>
        <Sun className="h-3.5 w-3.5 text-yellow-200 fill-yellow-200" />
      </div>

      {/* 2. 밤 아이콘: 달이 뜨는 애니메이션 (위에서 나타나며 정착) */}
      <div
        className={cn(
          'absolute right-1.5 z-10 transition-all duration-500 ease-in-out pointer-events-none',
          isDark
            ? 'opacity-100 translate-y-0 scale-100 rotate-0'
            : 'opacity-0 -translate-y-2 scale-50 rotate-12'
        )}>
        <Moon className="h-3.5 w-3.5 text-slate-100 fill-slate-100" />
      </div>

      {/* 3. 스위치 본체 */}
      <Switch
        checked={isDark}
        onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')}
        className={cn(
          'w-[54px] h-[28px] p-1 border-2', // 약간 키워서 시인성 확보
          'transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]', // 부드러운 이동 곡선
          'data-[state=unchecked]:bg-sky-400 data-[state=unchecked]:border-sky-300',
          'data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-800',

          // 내부 원(Thumb) 애니메이션
          '[&>span]:h-5 [&>span]:w-5',
          '[&>span]:transition-all [&>span]:duration-500 [&>span]:ease-[cubic-bezier(0.34,1.56,0.64,1)]', // 튕기는 효과(Spring)
          '[&>span]:data-[state=unchecked]:translate-x-0',
          '[&>span]:data-[state=checked]:translate-x-[26px]',
          '[&>span]:bg-white [&>span]:shadow-[0_0_10px_rgba(255,255,255,0.5)]', // 약간의 빛 효과

          // 클릭 시 살짝 작아지는 효과
          'active:scale-95'
        )}
      />
    </div>
  )
}
