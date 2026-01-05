import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

// 메뉴 항목 정의
const items = [
  { title: '홈', url: '/', icon: Home },
  { title: '테스트', url: '/test', icon: Inbox },
  { title: '스케줄', url: '/schedule', icon: Calendar },
  { title: '차트', url: '/chart', icon: Search },
  { title: '설정', url: '/settings', icon: Settings }
]

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 top-0 z-50 h-screen border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
