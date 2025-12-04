'use client' // 상태 관리 및 상호작용을 위해 클라이언트 컴포넌트로 지정

import React, { useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

const TwoStageProgress: React.FC = () => {
  const [progress, setProgress] = useState(0) // 현재 진행률 (0~100)
  const [isLoading, setIsLoading] = useState(false) // 작업 진행 여부
  const [isDone, setIsDone] = useState(false) // 작업 완료 여부

  const handleClick = () => {
    // 1. 상태 초기화 및 로딩 시작
    setProgress(0)
    setIsDone(false)
    setIsLoading(true)

    // --- Step 1: 0% -> 20% (1초 동안 1%씩 20번 증가) ---
    let currentProgress = 0

    // 50ms마다 1%씩 증가시켜 1000ms (1초) 동안 20%에 도달
    const intervalId = setInterval(() => {
      currentProgress += 1
      setProgress(currentProgress)

      if (currentProgress >= 50) {
        clearInterval(intervalId)

        // --- Step 2: 20% 도달 후, 100%로 완료 (즉시 또는 짧은 지연 후) ---
        // 50ms 지연 후 100%로 설정하여 완료 애니메이션을 부드럽게 시작
        setTimeout(() => {
          setProgress(100)
          setIsDone(true)
          setIsLoading(false)
        }, 100)
      }
    }, 50) // 1000ms / 20 = 50ms

    // 컴포넌트가 언마운트될 경우를 대비해 인터벌 정리
    return () => clearInterval(intervalId)
  }

  return (
    <div className="w-full max-w-md space-y-4 p-6 border rounded-lg shadow-md">
      <h3 className="text-xl font-bold">이중 단계 진행 표시줄</h3>

      {/* Progress Bar 렌더링 */}
      <Progress
        value={progress}
        className="w-full"
      />

      {/* 상태 표시 텍스트 */}
      <p className="text-sm text-gray-600">
        {isLoading && progress < 100
          ? `처리 중... ${progress}%`
          : isDone
            ? '✅ 작업이 성공적으로 완료되었습니다!'
            : '시작 버튼을 눌러 작업을 시작하세요.'}
      </p>

      {/* 시작 버튼 */}
      <Button
        onClick={handleClick}
        disabled={isLoading} // 처리 중일 때는 버튼 비활성화
        className="w-full">
        {isLoading ? '처리 중...' : '작업 시작'}
      </Button>
    </div>
  )
}

export default TwoStageProgress
