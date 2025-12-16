'use client' // 클라이언트 컴포넌트로 지정 (Sheet 컴포넌트 사용을 위해)

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react' // lucide-react 아이콘 라이브러리 (별도 설치 필요: yarn add lucide-react)

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
        href="/settings"
        className="px-4 py-2 hover:bg-gray-100 rounded-md">
        설정
      </Link>
    </>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 1. 반응형 헤더 */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="text-xl font-bold">TITLE</div>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-4">
          {NavLinks}
          <Button variant="outline">로그인</Button>
        </nav>

        {/* 모바일 햄버거 메뉴 (shadcn/ui Sheet 사용) */}
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
              {/* 왼쪽에서 슬라이드 아웃 */}
              <nav className="flex flex-col space-y-4 pt-8">
                {NavLinks}
                <Button variant="outline">로그인</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* 2. 메인 콘텐츠 및 사이드바 (데스크톱 전용) */}
      <div className="flex flex-1">
        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 px-1 py-4 md:p-8 flex justify-center">
          {children} {/* 자식 컴포넌트가 여기에 렌더링됨 */}
        </main>
      </div>

      {/* 3. 푸터 */}
      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        &copy; {new Date().getFullYear()} 내 반응형 앱. All rights reserved.
      </footer>
    </div>
  )
}

export default Layout
