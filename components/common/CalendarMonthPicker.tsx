import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { MonthPicker } from '../ui/monthpicker'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface Props {
  month: Date
  monthChange: (date: Date) => void
}

export default function CalendarMonthPicker(props: Props) {
  const { month, monthChange } = props

  const handleMonthChange = (date: Date) => {
    monthChange(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[200px] justify-start text-left font-normal',
            !month && 'text-muted-foreground'
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {month ? format(month, 'MMM yyyy') : <span>Pick a month</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthPicker
          onMonthSelect={handleMonthChange}
          selectedMonth={month}
        />
      </PopoverContent>
    </Popover>
  )
}
