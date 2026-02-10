'use client' // 클라이언트 컴포넌트로 지정 (Sheet 컴포넌트 사용을 위해)

import React from 'react'
import { AppSidebar } from './AppSidebar'
import { SidebarProvider } from './ui/sidebar'
import { Header } from './Header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex flex-col h-screen w-full bg-background transition-colors duration-300">
        {/* 1. 최상단 헤더 (보더 없음) */}
        <Header />

        {/* 2. 하단 영역 (사이드바 + 콘텐츠) */}
        <div className="relative flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-zinc-950">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Layout
