// app/test/page.tsx

import React from 'react'
// shadcn/ui 컴포넌트 임포트
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge' // 추가된 컴포넌트
import { Separator } from '@/components/ui/separator' // 추가된 컴포넌트

// 직접 생성한 컴포넌트 임포트
import ServiceCardLayout from '@/components/ServiceCardLayout'
import { Calendar } from '@/components/ui/calendar'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import ImageCard from '@/components/common/ImageCard'
import TwoStageProgress from '@/components/common/TwoStageProgress'
import DataCalendar from '@/components/common/DataCalendar'

// 테스트용 데이터
const testServiceData = [
  {
    id: 101,
    title: '서비스 1 (Primary)',
    description: '기본 버튼과 뱃지를 테스트합니다.'
  },
  {
    id: 102,
    title: '서비스 2 (Outline)',
    description: 'Outline 버튼 스타일을 테스트합니다.'
  },
  {
    id: 103,
    title: '서비스 3 (Secondary)',
    description: 'Secondary 버튼과 Separator를 테스트합니다.'
  },
  {
    id: 104,
    title: '서비스 4 (Link)',
    description: 'Link 스타일 버튼을 테스트합니다.'
  }
]

export default function TestPage() {
  return (
    <div className="space-y-12 w-3/4">
      <h1 className="text-4xl font-extrabold border-b pb-4">
        🧪 통합 테스트 페이지 (App Router)
      </h1>

      {/* --- 1. 직접 생성한 ServiceCardLayout 테스트 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">1. ServiceCardLayout 테스트</h2>
        <p className="text-gray-600">
          모바일/데스크톱에서 `ServiceCardLayout`의 반응형 그리드 배치가
          정상인지 확인합니다.
        </p>
        <div className="p-4 bg-white rounded-lg shadow-inner">
          <ServiceCardLayout items={testServiceData} />
        </div>
      </section>

      <Separator />

      {/* --- 2. 기본 shadcn/ui 컴포넌트 테스트 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">2. 기본 UI 컴포넌트 테스트</h2>

        {/* 버튼 테스트 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">버튼 (Button)</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button>Default Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        {/* 뱃지 테스트 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">뱃지 (Badge)</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>

        {/* 카드 테스트 (반응형 x) */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">카드 (Card)</h3>
          <Card className="w-full md:w-96">
            <CardHeader>
              <CardTitle>테스트 카드</CardTitle>
            </CardHeader>
            <CardContent>
              <p>이것은 일반적인 shadcn/ui Card 컴포넌트입니다.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">확인</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <Separator />

      {/* --- 3. 커스텀 로직 테스트 영역 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">3. 커스텀 로직 영역</h2>
        <p>
          여기서는 실제 애플리케이션에 필요한 상태 관리나 데이터 패칭 로직을
          구현하여 테스트할 수 있습니다.
        </p>
        <Card>
          <CardContent className="p-4">
            {/* 예를 들어, 카운터 컴포넌트 등 */}
            <p className="text-lg font-medium">커스텀 컴포넌트 자리</p>
          </CardContent>
        </Card>
      </section>

      {/* --- 4. 캘린더 영역 --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">4. 캘린더 영역</h2>
        <div className="flex justify-center">
          <DataCalendar />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">5. 스위치와 카드</h2>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
        <div className="flex items-center space-x-2">
          <TwoStageProgress />
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
          <ImageCard
            title="LIVE1"
            description=""
            imageUrl="https://i.ytimg.com/vi/Ofq11cvq_v4/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAN_12GxI_quJqD45fRKLsnLEvfqA"
            imageAlt="이미지"
            buttonText="버튼"
            videoType="LIVE"
            videoDuration="1:00:23"
          />
          <ImageCard
            title="VIDEO2"
            description=""
            imageUrl="https://i.ytimg.com/vi/hsHO39PnC1s/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBMpkC-TzdOe7xFOwWJ7MzeEYfNRA"
            imageAlt="이미지"
            buttonText="버튼"
            videoType="VIDEO"
            videoDuration="30:35"
          />
          <ImageCard
            title="SHORT3"
            description=""
            imageUrl="https://i.ytimg.com/vi/hsHO39PnC1s/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBMpkC-TzdOe7xFOwWJ7MzeEYfNRA"
            imageAlt="이미지"
            buttonText="버튼"
            videoType="SHORTS"
            videoDuration="00:35"
          />
        </div>
      </section>

      <section className="space-y-6"></section>
    </div>
  )
}
