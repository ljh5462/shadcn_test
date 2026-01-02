'use client' // 클라이언트 컴포넌트 선언

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// 1. 필요한 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface Props {
  labels: string[]
  dataLabel: string
  dataLabel2: string
  data: number[]
  data2: number[]
}

export default function LineChart(props: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: '월별 방문자 통계'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 4000
      }
    }
  }

  const data = {
    labels: props.labels,
    datasets: [
      {
        fill: false,
        label: props.dataLabel,
        data: props.data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      },
      {
        fill: false,
        label: props.dataLabel2,
        data: props.data2,
        borderColor: 'rgb(247, 111, 179)',
        backgroundColor: 'rgba(233, 47, 193, 0.5)'
      }
    ]
  }

  return (
    <div className="w-full max-w-2xl p-2 bg-white rounded-xl shadow-md h-[350px]">
      <Line
        options={options}
        data={data}
      />
    </div>
  )
}
