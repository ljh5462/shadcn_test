'use client'

import { Calendar } from '@/components/ui/calendar'
import { enUS, ko } from 'date-fns/locale'
import { useState } from 'react'
import { DayProps } from 'react-day-picker'
import { format } from 'date-fns'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import CalendarMonthPicker from './CalendarMonthPicker'

interface VideoDates {
  date: string
  time: string
  type: string
  title: string
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

    const getTypeBadgeClass = (type: string) => {
      switch (type) {
        case 'LIVE':
          return 'bg-red-600 hover:bg-red-700 text-white' // 붉은 배경
        case 'SHORTS':
          return 'bg-purple-600 hover:bg-purple-700 text-white' // 숏츠는 보라색 (선택 사항)
        case 'VIDEO':
        default:
          return 'bg-gray-800 hover:bg-gray-700 text-white' // 일반 영상은 어두운 회색
      }
    }

    return (
      <td
        {...props}
        onClick={handleDayClick}
        className={`
        flex items-center justify-center w-[50px] h-full md:w-18 md:h-20
        rounded-md cursor-pointer box-border border-2 hover:bg-pink-100 md:m-0.5
        ${isSat ? 'text-blue-500' : ''}
        ${isSun ? 'text-red-500' : ''}
        ${!isThisMonth ? 'opacity-30' : ''}
        ${isSelected ? 'text-accent-foreground  border-pink-400' : 'border-transparent'}
        
      `}>
        {/* 날짜 숫자 */}
        <button
          className={`
        cursor-pointer m-0.5 pt-1 pb-3.5 md:p-1 w-11/12 h-11/12 md:w-16 md:h-18 flex flex-col justify-start
        ${isEventDay && viewMode ? 'bg-pink-200 rounded-sm text-white' : isEventDay && !viewMode ? 'bg-blue-400 rounded-sm text-white' : ''}
          `}>
          <span className="relative text-sm">
            {props.children}

            {/* 날짜에 데이터가 있을 때 표시 */}
          </span>
          <div className="h-3 text-xs flex flex-col gap-1 mt-1">
            {eventList.length > 0 && viewMode ? (
              <>
                <div className="flex-col gap-0.5 opacity-80 hidden md:flex">
                  {eventList.map((e, i) => (
                    <Tooltip key={i}>
                      <TooltipTrigger asChild>
                        <div
                          key={i}
                          className={`
                          rounded-md text-[9px]
                          ${getTypeBadgeClass(e.type)}
                        `}>
                          {e.time}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        {e.time} - {e.title}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
                <div className="flex-col gap-1 opacity-80 flex md:hidden items-center">
                  {eventList.map((e, i) => (
                    <div
                      key={i}
                      className={`
                          rounded-md w-4/5 h-1
                          ${getTypeBadgeClass(e.type)}
                        `}></div>
                  ))}
                </div>
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
  { date: '2025-12-10', type: 'LIVE', time: '21:00', title: '123123' },
  { date: '2025-12-11', type: 'LIVE', time: '19:00', title: 'afdfsd' },
  { date: '2025-12-11', type: 'VIDEO', time: '20:00', title: 'bfgn' },
  { date: '2025-12-11', type: 'LIVE', time: '21:00', title: 'sdnbng' },
  { date: '2025-12-12', type: 'SHORTS', time: '18:00', title: 'sdfsdv' },
  { date: '2025-12-12', type: 'LIVE', time: '22:00', title: 'ngghfgn' }
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
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = useState<string>('')
  const [dialogEvents, setDialogEvents] = useState<VideoDates[]>([])

  const handleDaySelection = (date: Date) => {
    setSelected(date)
    if (date.getMonth() !== month.getMonth()) {
      setMonth(date)
      return
    }
    const dateString = format(date, 'yyyy-MM-dd')
    const events = eventDates.filter(e => e.date === dateString)
    if (events.length > 0) {
      setIsDialogOpen(true)
      setDialogTitle(dateString)
      setDialogEvents(events)
    }
  }

  const handleMonthChange = (date: Date) => {
    setMonth(date)
    setSelected(date)
  }

  const handleModeChange = () => {
    setViewMode(!viewMode)
  }

  const handleDialogClose = (open: boolean) => {
    // Dialog가 닫힐 때 상태를 null로 초기화합니다.
    if (!open) {
      setIsDialogOpen(!isDialogOpen)
    }
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
      <div className="flex justify-between items-center space-x-2">
        <CalendarMonthPicker
          month={month}
          monthChange={handleMonthChange}
        />
        <div className="flex gap-4">
          <Switch
            id="airplane-mode"
            checked={viewMode}
            onClick={handleModeChange}
          />
          <Label htmlFor="airplane-mode">Event Mode</Label>
        </div>
      </div>
      <Calendar
        components={{ Day: DayWithCustomProps }}
        locale={enUS}
        selected={selected}
        month={month}
        onMonthChange={handleMonthChange}
        fixedWeeks={true}
        //captionLayout="dropdown"
        fromYear={2018}
        className="w-full max-w-[400px] md:max-w-[600px] rounded-xl border shadow-2xl"
        classNames={{
          table: 'w-full h-full',
          head_row: 'grid grid-cols-7',
          row: 'grid grid-cols-7',
          cell: 'aspect-square p-0' // 정사각형 셀이 됨
        }}
      />

      <Dialog
        // [핵심] selectedDate가 null이 아닐 때만 Dialog가 열림
        open={isDialogOpen}
        onOpenChange={handleDialogClose} // 닫기 버튼이나 배경 클릭 시 호출
      >
        <DialogContent>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {dialogEvents.map((e, idx) => (
            <div key={idx}>
              {e.time} - {e.type} : {e.title}
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  )
}
