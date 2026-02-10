'use client'

import AgGridSample from '@/components/grid/AgGridSample'
import ComplexGrid from '@/components/grid/ComplexGrid'

export default function GridPage() {
  return (
    <div className="space-y-12 w-5/6">
      <div className="flex flex-col md:justify-center flex-wrap items-center gap-2">
        <AgGridSample />
        <ComplexGrid />
      </div>
    </div>
  )
}
