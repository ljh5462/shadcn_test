import { Calendar, Home, Inbox, Search, Settings, Grid } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

// 메뉴 항목 정의
const items = [
  { title: '홈', url: '/', icon: Home },
  { title: '테스트', url: '/test', icon: Inbox },
  { title: '스케줄', url: '/schedule', icon: Calendar },
  { title: '그리드', url: '/grid', icon: Grid },
  { title: '차트', url: '/chart', icon: Search },
  { title: '설정', url: '/settings', icon: Settings }
]

const menuItems = [
  { icon: Home, label: 'Home', url: '/', delay: 'delay-[100ms]' },
  { icon: Inbox, label: 'Test', url: '/test', delay: 'delay-[150ms]' },
  {
    icon: Calendar,
    label: 'Schedule',
    url: '/schedule',
    delay: 'delay-[200ms]'
  },
  { icon: Grid, label: 'Grid', url: '/grid', delay: 'delay-[250ms]' },
  { icon: Search, label: 'Chart', url: '/chart', delay: 'delay-[300ms]' },
  {
    icon: Settings,
    label: 'Settings',
    url: '/settings',
    delay: 'delay-[350ms]'
  }
]

export function AppSidebar() {
  const { open, setOpen, openMobile, isMobile, setOpenMobile } = useSidebar()
  const activeOpen = isMobile ? openMobile : open
  const isAnyOpen = isMobile ? openMobile : open
  const touchStartX = useRef<number>(0)
  const pathname = usePathname()

  const handleToggleClick = () => {
    if (isMobile) {
      // 모바일일 때는 openMobile 상태를 반전
      setOpenMobile(!openMobile)
    } else {
      // PC일 때는 기존처럼 open 상태를 반전
      setOpen(!open)
    }
  }

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false) // 모바일에서만 사이드바 닫기
    }
  }

  useEffect(() => {
    if (!isMobile) return

    const handleTouchStart = (e: TouchEvent) => {
      // 화면 왼쪽 끝(30px 이내)에서 터치가 시작되었는지 확인
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX
      const deltaX = touchEndX - touchStartX.current

      // 1. 왼쪽 끝에서 시작해서 (0~40px)
      // 2. 오른쪽으로 충분히(50px 이상) 밀었을 때 사이드바 열기
      if (touchStartX.current < 40 && deltaX > 50 && !openMobile) {
        setOpenMobile(true)
      }

      // 반대로 사이드바가 열려있을 때 왼쪽으로 밀면 닫기
      if (openMobile && deltaX < -50) {
        setOpenMobile(false)
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isMobile, openMobile, setOpenMobile])

  return (
    <>
      {/* 1. 배경 오버레이 애니메이션 (헤더 제외) */}
      <div
        className={cn(
          'fixed left-0 z-50 border-none bg-card transition-all duration-200',
          'top-16 h-[calc(100dvh-64px)]',
          activeOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none',
          isMobile
            ? openMobile
              ? 'translate-x-0 w-[var(--sidebar-width)]'
              : '-translate-x-full w-[var(--sidebar-width)]'
            : open
              ? 'w-[var(--sidebar-width)]'
              : 'w-[var(--sidebar-width-icon)]'
        )}
        onClick={() => isMobile && setOpenMobile(false)} // 모바일은 배경 클릭 시 닫기 가능
      />

      <Sidebar
        collapsible="icon"
        className={cn(
          'fixed left-0 z-150 border-none bg-card transition-all duration-200',
          'top-16 h-[calc(100dvh-64px)] shadow-2xl', // 100dvh로 모바일 주소창 대응
          // 모바일일 때: 열리면 0, 닫히면 전체 화면 밖(-100%)으로
          isMobile
            ? open
              ? 'translate-x-0 w-[var(--sidebar-width)]'
              : '-translate-x-full w-[var(--sidebar-width)]'
            : open
              ? 'w-[var(--sidebar-width)]'
              : 'w-[var(--sidebar-width-icon)]'
        )}
        style={{
          position: 'fixed',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDuration: '200ms'
        }}>
        {/* 상단 텍스트 페이드 애니메이션 */}
        <SidebarHeader
          className={cn(
            'h-20 md:h-8 flex px-6 transition-all duration-200 opacity-0',
            isMobile
              ? open
                ? 'opacity-100 translate-y-0'
                : ''
              : open
                ? 'translate-y-0'
                : '-translate-y-2 pointer-events-none'
          )}>
          <div className="flex items-center gap-4">
            {/* 커스텀 ≡ 아이콘 버튼 */}
            {/* 🌸 커스텀 트리거 버튼 */}
            <button
              onClick={handleToggleClick}
              className={cn(
                'p-2 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer'
              )}
              aria-label="Toggle Sidebar">
              <span className="text-2xl inline-block transition-all duration-700 ease-in-out hover:rotate-[360deg]">
                🌸
              </span>
            </button>

            <div className="h-4 w-[1px] bg-muted-foreground/30" />
            <span className="text-xs font-bold text-muted-foreground tracking-[0.2em] uppercase">
              Admin Portal
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2 overflow-hidden">
          <SidebarMenu className="gap-2">
            {menuItems.map(item => {
              const isActive = pathname === item.url // 현재 활성화된 메뉴인지 확인

              return (
                <SidebarMenuItem key={item.label}>
                  {/* 2. asChild를 사용하여 Link 컴포넌트 삽입 */}
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    className={cn(
                      'h-11 group transition-colors duration-200',
                      'hover:bg-pink-200/50 dark:hover:bg-white/20',
                      isActive && 'bg-pink-100/50 dark:bg-white/10' // 활성화 상태 배경
                    )}>
                    <Link
                      href={item.url}
                      onClick={handleLinkClick}
                      className="flex items-center w-full">
                      <item.icon
                        className={cn(
                          'size-5 shrink-0 transition-transform duration-300 ease-out',
                          // 사이드바가 열려있을 때 아이콘 크기 고정 유지
                          open
                            ? 'scale-125  dark:text-white'
                            : 'scale-100 text-muted-foreground',
                          isActive && 'text-pink-600 dark:text-white' // 활성화 상태 아이콘 색상
                        )}
                      />
                      <span
                        className={cn(
                          'font-bold ml-3 transition-all duration-500 ease-out',
                          item.delay,
                          // open 대신 통합된 상태 변수인 isAnyOpen을 사용합니다.
                          isAnyOpen
                            ? 'opacity-100 translate-x-0 text-slate-900 dark:text-slate-100'
                            : 'opacity-0 -translate-x-10 pointer-events-none'
                        )}>
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      {/* 아이콘 레일 공간 확보 */}
      <div className="w-[var(--sidebar-width-icon)] shrink-0 h-full hidden md:block" />
    </>
  )
}
