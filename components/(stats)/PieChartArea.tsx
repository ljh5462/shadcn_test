'use client'

import { PieChart } from '../chart/PieChart'

export function PieChartArea() {
  const labels = ['유료 회원', '무료 회원', '체험판']

  const data = [300, 500, 100]
  const bgColor = ['#6366f1', '#ec4899', '#94a3b8']

  return (
    <PieChart
      labels={labels}
      data={data}
      bgColor={bgColor}
    />
  )
}
