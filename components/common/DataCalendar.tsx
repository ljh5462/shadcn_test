'use client'
import { Calendar } from '@/components/ui/calendar'
import { CustomDay } from './CustomDay'
import { ko } from 'date-fns/locale'

export default function CustomCalendar() {
  return (
    <Calendar
      components={{ Day: CustomDay }}
      locale={ko}
      className="w-full max-w-[400px] md:max-w-[600px] rounded-xl border shadow-2xl"
      classNames={{
        table: 'w-full h-full',
        head_row: 'grid grid-cols-7',
        row: 'grid grid-cols-7',
        cell: 'aspect-square p-0' // 정사각형 셀이 됨
      }}
    />
  )
}
