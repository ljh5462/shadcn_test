import DataCalendar from '@/components/common/DataCalendar'

export default function SchedulePage() {
  return (
    <div className="space-y-12 w-5/6">
      {/* --- 4. 캘린더 영역 --- */}
      <div className="flex justify-center">
        <DataCalendar />
      </div>
    </div>
  )
}
