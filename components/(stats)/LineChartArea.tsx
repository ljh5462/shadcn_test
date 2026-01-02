'use client'

import LineChart from '../chart/LineChart'

export function LineChartArea() {
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
  const dataLabel = '테스트3'
  const dataLabel2 = '테스트4'
  const data = [
    1200, 1900, 1500, 2500, 2200, 3000, 4423, 3454, 2344, 1135, 2235, 2232
  ]
  const data2 = [
    2000, 3500, 2300, 4900, 2000, 2343, 3409, 3209, 1023, 3293, 2240, 2235
  ]

  return (
    <LineChart
      labels={labels}
      dataLabel={dataLabel}
      dataLabel2={dataLabel2}
      data={data}
      data2={data2}
    />
  )
}
