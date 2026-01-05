'use client' // 클라이언트 컴포넌트로 지정 (Sheet 컴포넌트 사용을 위해)

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react' // lucide-react 아이콘 라이브러리 (별도 설치 필요: yarn add lucide-react)
import { AppSidebar } from './common/AppSidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'
import { ModeToggle } from './common/mode-toggle'
import { ThemeSwitch } from './common/theme-switch'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false) // 모바일 사이드바 상태

  const NavLinks = (
    <>
      <Link
        href="/"
        className="px-4 py-2 hover:bg-gray-100 rounded-md">
        홈
      </Link>
      <Link
        href="/test"
        className="px-4 py-2 hover:bg-gray-100 rounded-md">
        테스트
      </Link>
      <Link
        href="/schedule"
        className="px-4 py-2 hover:bg-gray-100 rounded-md">
        스케줄
      </Link>
      <Link
        href="/chart"
        className="px-4 py-2 hover:bg-gray-100 rounded-md">
        차트
      </Link>
      <Link
        href="/settings"
        className="px-4 py-2 hover:bg-gray-100 rounded-md">
        설정
      </Link>
    </>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="text-xl font-bold">TITLE</div>


        <nav className="hidden md:flex items-center space-x-4">
          {NavLinks}
        </nav>

        <div className="md:hidden">
          <Sheet
            open={isOpen}
            onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              {' '}
              <nav className="flex flex-col space-y-4 pt-8">
                {NavLinks}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header> */}
      <SidebarProvider defaultOpen={false}>
        {/* 2. 좌측 사이드바 영역 */}
        <AppSidebar />

        {/* 3. 사이드바를 제외한 나머지 전체 영역 (Header + Content) */}
        <SidebarInset>
          {/* 상단 헤더 영역 */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
              {/* 사이드바를 열고 닫는 버튼 */}
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 h-4"
              />
              <h1 className="text-sm font-medium">Dashboard</h1>
              {/* <ModeToggle /> */}
            </div>
          </header>

          {/* 메인 컨텐츠 영역 */}
          <main className="flex flex-1 flex-col gap-4 pt-0 p-2">
            <div className="flex w-full justify-center min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        &copy; {new Date().getFullYear()} 내 반응형 앱. All rights reserved.
      </footer>
    </div>
  )
}

export default Layout
