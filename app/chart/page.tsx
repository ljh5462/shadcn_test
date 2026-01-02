import { BarChartArea } from '@/components/(stats)/BarChartArea'
import { LineChartArea } from '@/components/(stats)/LineChartArea'
import { PieChartArea } from '@/components/(stats)/PieChartArea'

export default function ChartPage() {
  return (
    <div className="space-y-12 w-5/6">
      <div className="flex flex-col md:justify-center flex-wrap items-center gap-2">
        <LineChartArea />
        <BarChartArea />
        <PieChartArea />
      </div>
    </div>
  )
}
