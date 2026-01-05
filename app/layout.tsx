import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Layout from '@/components/Layout' // 새로 만든 Layout 컴포넌트 import
import { ThemeProvider } from '@/components/common/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Responsive Shadcn App',
  description: 'Next.js App with Shadcn UI and Responsive Layout'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body className={inter.className}>
        {/* 모든 페이지에 적용될 Layout 컴포넌트 */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}>
          <Layout>
            {children} {/* 각 페이지 콘텐츠는 Layout 내부에 렌더링됩니다. */}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}
