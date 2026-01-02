'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
  labels: string[]
  dataLabel: string
  dataLabel2: string
  data: number[]
  data2: number[]
}

export function BarChart(props: Props) {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.dataLabel,
        data: props.data,
        // 1. 색상 및 테두리
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,

        // 2. 막대 모양 커스텀 (UI 트렌드)
        borderRadius: 8, // 막대 끝을 둥글게 (px)
        borderSkipped: false, // 모든 방향에 테두리 적용 여부

        // 3. 막대 두께 조절 (0~1 사이 값)
        barPercentage: 0.8, // 개별 막대의 너비 비율
        categoryPercentage: 0.9 // 카테고리 내 막대 그룹의 너비 비율
      },
      {
        label: props.dataLabel2,
        data: props.data2,
        // 1. 색상 및 테두리
        backgroundColor: 'rgba(235, 54, 175, 0.5)',
        borderColor: '#eb36dc',
        borderWidth: 1,

        // 2. 막대 모양 커스텀 (UI 트렌드)
        borderRadius: 8, // 막대 끝을 둥글게 (px)
        borderSkipped: false, // 모든 방향에 테두리 적용 여부

        // 3. 막대 두께 조절 (0~1 사이 값)
        barPercentage: 0.8, // 개별 막대의 너비 비율
        categoryPercentage: 0.9 // 카테고리 내 막대 그룹의 너비 비율
      }
    ]
  }

  const option = {
    responsive: true,
    maintainAspectRatio: false, // 부모 컨테이너 크기에 맞게 조절
    scales: {
      y: {
        beginAtZero: true, // Y축이 항상 0부터 시작하도록 강제
        grid: {
          display: true, // 배경 그리드 선 표시 여부
          drawBorder: false // 축 테두리 선 숨기기
        }
      },
      x: {
        grid: {
          display: false // X축 세로 그리드 선 숨기기 (깔끔한 UI)
        }
      }
    }
  }

  return (
    <div className="w-full max-w-2xl p-2 bg-white rounded-xl shadow-md h-[350px]">
      <Bar
        data={data}
        options={option}
      />
    </div>
  )
}
