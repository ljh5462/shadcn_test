'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  labels: string[]
  data: number[]
  bgColor: string[]
}

export function PieChart(props: Props) {
  const data = {
    labels: ['유료 회원', '무료 회원', '체험판'],
    datasets: [
      {
        data: [300, 500, 100],
        backgroundColor: ['#6366f1', '#ec4899', '#94a3b8'],
        hoverOffset: 4
      }
    ]
  }

  return (
    <div className="flex justify-center w-full max-w-2xl p-2 bg-white rounded-xl shadow-md h-[350px]">
      <Pie data={data} />
    </div>
  )
}
