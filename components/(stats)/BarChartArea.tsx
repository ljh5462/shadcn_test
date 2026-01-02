'use client'

import { BarChart } from '../chart/BarChart'

export function BarChartArea() {
  const labels = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ]
  const dataLabel = '테스트'
  const dataLabel2 = '테스트2'
  const data = [3, 4, 7, 8, 9, 1, 6, 0, 2, 4, 8, 2, 4]
  const data2 = [1, 6, 9, 2, 5, 0, 2, 6, 8, 3, 2, 9]

  return (
    <BarChart
      labels={labels}
      dataLabel={dataLabel}
      dataLabel2={dataLabel2}
      data={data}
      data2={data2}
    />
  )
}
