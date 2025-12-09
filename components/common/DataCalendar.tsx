'use client'

import { Calendar } from '@/components/ui/calendar'
import { enUS, ko } from 'date-fns/locale'
import { useState } from 'react'
import { DayProps } from 'react-day-picker'
import { format } from 'date-fns'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Badge } from '../ui/badge'

interface VideoDates {
  date: string
  time: string
  type: string
}

interface MemberDates {
  date: string
  img: string
}

interface CustomDayProps extends DayProps {
  selected?: Date
  month?: Date
  eventDates?: VideoDates[]
  eventDates2?: MemberDates[]
  viewMode?: boolean
  onDaySelect?: (date: Date) => void // 날짜 클릭 이벤트
}

const createCustomDay = (
  selected: Date,
  month: Date,
  eventDates: VideoDates[],
  eventDates2: MemberDates[],
  viewMode: boolean,
  onDaySelect: (date: Date) => void
) => {
  // 이것이 components={{ Day: ... }}에 들어갈 실제 렌더링 컴포넌트입니다.
  const CustomDay = (props: CustomDayProps) => {
    // 1. react-day-picker 표준 props에 접근합니다.
    const { day } = props

    const date = day.date.getDay()

    const isSat = date === 6
    const isSun = date === 0

    // 2. 외부 HOF로부터 클로저를 통해 캡처된 props에 접근합니다.
    const dateString = format(day.date, 'yyyy-MM-dd')
    const mmddString = format(day.date, 'MM-dd')

    const eventList = eventDates.filter(e => e.date === dateString)
    const eventList2 = eventDates2.filter(e => e.date === mmddString)

    const isEventDay = viewMode ? eventList.length > 0 : eventList2.length > 0

    const isThisMonth = month.getMonth() === day.date.getMonth()
    const isSelected = format(selected, 'yyyy-MM-dd') === dateString

    // 날짜 클릭시 발생하는 이벤트
    const handleDayClick = () => {
      onDaySelect(day.date)
    }

    return (
      <td
        {...props}
        onClick={handleDayClick}
        className={`
        flex items-center justify-center w-full h-full p-1
        rounded-md cursor-pointer
        ${isSat ? 'text-blue-500' : ''}
        ${isSun ? 'text-red-500' : ''}
        ${!isThisMonth ? 'opacity-30' : ''}
        ${isSelected ? 'bg-accent text-accent-foreground hover:bg-accent/80' : ''}
        
      `}>
        {/* 날짜 숫자 */}
        <button
          className={`
        cursor-pointer p-3
        ${isEventDay && viewMode ? 'bg-pink-300 rounded-sm text-white' : isEventDay && !viewMode ? 'bg-blue-400 rounded-sm text-white' : ''}
          `}>
          <span className="relative">
            {props.children}

            {/* 날짜에 데이터가 있을 때 dot 표시 */}
          </span>
          <div className="h-3 text-xs flex flex-col gap-1">
            {eventList.length > 0 && viewMode ? (
              <>
                {/* {eventList.map((e, i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full">
                    {e.time}
                  </span>
                ))} */}
              </>
            ) : (
              // <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></span>
              <></>
            )}
            {/* <Badge className="hidden md:block">21:00</Badge> */}
          </div>
        </button>
      </td>
    )
  }

  return CustomDay
}

const samplaData = [
  { date: '2025-12-10', type: 'LIVE', time: '21:00' },
  { date: '2025-12-11', type: 'LIVE', time: '19:00' },
  { date: '2025-12-11', type: 'VIDEO', time: '20:00' },
  { date: '2025-12-12', type: 'SHORT', time: '18:00' },
  { date: '2025-12-12', type: 'LIVE', time: '22:00' }
]

const sampleData2 = [
  {
    date: '12-12',
    img: 'https://i.ytimg.com/vi/hsHO39PnC1s/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBMpkC-TzdOe7xFOwWJ7MzeEYfNRA'
  }
]

export default function CustomCalendar() {
  const [selected, setSelected] = useState<Date>(new Date())
  const [month, setMonth] = useState<Date>(new Date())
  const [eventDates, setEventDates] = useState<VideoDates[]>(samplaData)
  const [eventDate2, setEventDate2] = useState<MemberDates[]>(sampleData2)
  const [viewMode, setViewMode] = useState<boolean>(true)

  const handleDaySelection = (date: Date) => {
    if (date.getMonth() !== month.getMonth()) {
      setMonth(date)
    }
    setSelected(date)
  }

  const handleMonthChange = (date: Date) => {
    setMonth(date)
    setSelected(date)
  }

  const handleModeChange = () => {
    setViewMode(!viewMode)
  }

  const DayWithCustomProps = createCustomDay(
    selected,
    month,
    eventDates,
    eventDate2,
    viewMode,
    handleDaySelection
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="airplane-mode"
          checked={viewMode}
          onClick={handleModeChange}
        />
        <Label htmlFor="airplane-mode">Event Mode</Label>
      </div>
      <Calendar
        components={{ Day: DayWithCustomProps }}
        locale={enUS}
        selected={selected}
        month={month}
        onMonthChange={handleMonthChange}
        fixedWeeks={true}
        className="w-full max-w-[400px] md:max-w-[600px] rounded-xl border shadow-2xl"
        classNames={{
          table: 'w-full h-full',
          head_row: 'grid grid-cols-7',
          row: 'grid grid-cols-7',
          cell: 'aspect-square p-0' // 정사각형 셀이 됨
        }}
      />
    </div>
  )
}
