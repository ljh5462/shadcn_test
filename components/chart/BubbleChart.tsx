'use client'

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin
} from 'chart.js'
import { Bubble } from 'react-chartjs-2'
import { useEffect, useRef } from 'react'

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

/** 버블 데이터 타입 */
interface BubbleItem {
  x: number
  y: number
  r: number
  image: string
}

const dataItems: BubbleItem[] = [
  { x: 10, y: 20, r: 25, image: 'https://github.com/shadcn.png' },
  { x: 30, y: 40, r: 20, image: 'https://github.com/maxleiter.png' },
  { x: 50, y: 10, r: 30, image: 'https://github.com/evilrabbit.png' }
]

/** 이미지 버블 플러그인 */
const imageBubblePlugin: Plugin<'bubble'> = {
  id: 'imageBubblePlugin',
  afterDatasetsDraw(chart) {
    const { ctx } = chart

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex)
      meta.data.forEach((element, index) => {
        const point = element.getProps(['x', 'y', 'radius'], true)

        const item = dataItems[index]
        if (!item?.image) return

        const img = new Image()
        img.src = item.image

        img.onload = () => {
          ctx.save()
          ctx.beginPath()
          ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
          ctx.clip()

          ctx.drawImage(
            img,
            point.x - point.radius,
            point.y - point.radius,
            point.radius * 2,
            point.radius * 2
          )
          ctx.restore()
        }
      })
    })
  }
}

export default function BubbleChart() {
  const data = {
    datasets: [
      {
        label: 'Image Bubble',
        data: dataItems.map(({ x, y, r }) => ({ x, y, r })),
        backgroundColor: 'rgba(0,0,0,0)' // 투명
      }
    ]
  }

  const options: ChartOptions<'bubble'> = {
    responsive: true,
    scales: {
      x: { min: 0, max: 60 },
      y: { min: 0, max: 60 }
    }
  }

  return (
    <Bubble
      data={data}
      options={options}
      plugins={[imageBubblePlugin]}
    />
  )
}
