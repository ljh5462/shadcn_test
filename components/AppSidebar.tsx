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
  const { open, setOpen, isMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <>
      {/* 1. 배경 오버레이 애니메이션 (헤더 제외) */}
      <div
        className={cn(
          'fixed inset-0 z-40 mt-16 transition-all duration-500',
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      />

      <Sidebar
        collapsible="icon"
        className={cn(
          'fixed left-0 z-50 border-none bg-card transition-all duration-500',
          'top-16 h-[calc(100dvh-64px)] shadow-2xl', // 100dvh로 모바일 주소창 대응
          // 모바일일 때: 열리면 0, 닫히면 전체 화면 밖(-100%)으로
          isMobile
            ? open
              ? 'translate-x-0 w-[280px]'
              : '-translate-x-full w-[280px]'
            : open
              ? 'w-[var(--sidebar-width)]'
              : 'w-[var(--sidebar-width-icon)]'
        )}
        style={{
          position: 'fixed',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDuration: '500ms'
        }}>
        {/* 상단 텍스트 페이드 애니메이션 */}
        <SidebarHeader
          className={cn(
            'h-20 md:h-8 flex items-center px-4 transition-all duration-300',
            open
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          )}></SidebarHeader>

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
                          'font-medium ml-3 transition-all duration-500 ease-out',
                          item.delay,
                          open
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 -translate-x-10'
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
