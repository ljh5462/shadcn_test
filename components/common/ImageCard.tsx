// components/ImageCard.tsx
'use client'

import React from 'react'
import Image from 'next/image' // Next.js의 Image 컴포넌트 사용 (최적화)
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter
} from '@/components/ui/card'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface ImageCardProps {
  imageUrl: string
  imageAlt: string
  title: string
  description: string
  buttonText: string
  videoType: string
  videoDuration: string
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  imageAlt,
  title,
  description,
  videoType,
  videoDuration
}) => {
  const handleClick = (url: string) => {
    alert(`${url} 이동`)
  }

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'LIVE':
        return 'bg-red-600 hover:bg-red-700 text-white' // 붉은 배경
      case 'SHORTS':
        return 'bg-purple-600 hover:bg-purple-700 text-white' // 숏츠는 보라색 (선택 사항)
      case 'VIDEO':
      default:
        return 'bg-gray-800 hover:bg-gray-700 text-white' // 일반 영상은 어두운 회색
    }
  }

  return (
    // 1. 카드 컨테이너
    <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0">
      {/* 2. 이미지 영역: Next/Image 컴포넌트 사용 */}
      <div className="relative h-48 w-full">
        {/* 이미지를 부모 div에 꽉 채우고 비율에 맞게 자르려면 fill 속성 사용 */}
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }} // 이미지가 div를 덮도록 설정
          className="transition-transform duration-500 hover:scale-105 cursor-pointer" // 호버 효과 추가
          onClick={() => handleClick('url')}
        />

        {/* 좌측 상단: 영상 유형 뱃지 */}
        <Badge
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold ${getTypeBadgeClass(videoType)}`}>
          {videoType}
        </Badge>

        {/* 우측 하단: 영상 길이 뱃지 */}
        <Badge
          className="absolute bottom-2 right-2 px-2 py-1 text-xs font-semibold bg-black/70 text-white backdrop-blur-sm"
          // bg-black/70: 반투명 검은색 배경 (Tailwind의 opacity 유틸리티)
          // backdrop-blur-sm: 배경에 약간의 블러 효과 (YouTube와 유사)
        >
          {videoDuration}
        </Badge>
      </div>

      {/* 3. 헤더/제목 영역 */}
      <CardHeader>
        <CardTitle className="text-xl line-clamp-2">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>

      {/* 4. 내용 영역 (옵션) */}
      <CardContent>
        {/* 추가 내용이 필요한 경우 여기에 배치 */}
        <div className="text-xs"></div>
      </CardContent>

      {/* 5. 푸터/액션 영역 */}
      <CardFooter className="justify-end">
        <div className="flex flex-row flex-wrap items-center gap-12">
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ImageCard
