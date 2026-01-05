'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const toggleTheme = (event: React.MouseEvent) => {
    // 💡 View Transitions API를 지원하지 않는 브라우저 대응
    if (!document.startViewTransition) {
      setTheme(theme === 'dark' ? 'light' : 'dark')
      return
    }

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )

    const transition = document.startViewTransition(async () => {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    })

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ]
      document.documentElement.animate(
        {
          clipPath: theme === 'dark' ? [...clipPath].reverse() : clipPath
        },
        {
          duration: 400,
          easing: 'ease-in-out',
          pseudoElement:
            theme === 'dark'
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)'
        }
      )
    })
  }

  if (!mounted)
    return (
      <Button
        variant="outline"
        size="icon"
        disabled
      />
    )

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">테마 변경</span>
    </Button>
  )
}
