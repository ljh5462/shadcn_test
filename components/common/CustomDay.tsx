// CustomDay.tsx
import { DayProps } from 'react-day-picker'
import { format } from 'date-fns'

interface CustomDayProps extends DayProps {
  eventDates?: string[] // yyyy-MM-dd 리스트
  onDaySelect?: (date: Date) => void // 날짜 클릭 이벤트
}

export function CustomDay(props: CustomDayProps) {
  const { day, eventDates = ['2025-12-08'], onDaySelect } = props

  const date = day.date.getDay()
  const isSat = date === 6
  const isSun = date === 0

  const dateString = format(day.date, 'yyyy-MM-dd')
  const hasEvent = eventDates.includes(dateString)

  const handleDayClick = () => {}

  return (
    <td
      {...props}
      className={`
        flex items-center justify-center w-full h-full p-2
        rounded-md
        ${isSat ? 'text-blue-500' : ''}
        ${isSun ? 'text-red-500' : ''}
      `}>
      {/* 날짜 숫자 */}
      <button onClick={handleDayClick}>
        <span className="relative">
          {props.children}

          {/* 날짜에 데이터가 있을 때 dot 표시 */}
          {hasEvent && (
            <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></span>
          )}
        </span>
      </button>
    </td>
  )
}
