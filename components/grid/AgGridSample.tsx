'use client'

import React, { useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  RowSpanParams
} from 'ag-grid-community'

ModuleRegistry.registerModules([AllCommunityModule])

interface IRowData {
  month: string
  seq: number
  aPNum: number
  aRNum: number
  rowSpan?: number // 병합을 위해 추가
}

const AgGridSample = () => {
  // 1. 데이터 전처리: 같은 Month끼리 몇 개씩 묶일지 계산
  const processedData = useMemo(() => {
    const rawData: IRowData[] = [
      // Case: 1~10번 없이 998, 999만 있는 달
      { month: '2024-01', seq: 998, aPNum: 500000, aRNum: 450000 },
      { month: '2024-01', seq: 999, aPNum: 100000, aRNum: 100000 },
      // Case: 일반적인 달
      { month: '2024-02', seq: 1, aPNum: 200000, aRNum: 180000 },
      { month: '2024-02', seq: 998, aPNum: 300000, aRNum: 280000 }
    ]

    // Month별로 첫 번째 행에만 rowSpan 값을 할당
    for (let i = 0; i < rawData.length; i++) {
      const currentMonth = rawData[i].month
      let span = 1

      // 이미 처리된 행(span이 결정된 행)은 건너뜀
      if (i > 0 && rawData[i - 1].month === currentMonth) {
        rawData[i].rowSpan = 0 // 0이면 셀이 렌더링되지 않음 (병합되어 사라짐)
        continue
      }

      // 같은 달인 행이 몇 개인지 카운트
      for (let j = i + 1; j < rawData.length; j++) {
        if (rawData[j].month === currentMonth) span++
        else break
      }
      rawData[i].rowSpan = span
    }
    return rawData
  }, [])

  // 2. 컬럼 정의
  const columnDefs = useMemo<ColDef<IRowData>[]>(
    () => [
      {
        field: 'month',
        headerName: '기준월',
        pinned: 'left', // 고정 컬럼
        rowSpan: (params: RowSpanParams<IRowData>) => params.data?.rowSpan || 1,
        cellClassRules: {
          'cell-span-display': params => (params.data?.rowSpan || 0) > 0
        },
        width: 120
      },
      { field: 'seq', headerName: '순번' },
      { field: 'aPNum', headerName: '계획' },
      { field: 'aRNum', headerName: '실적' }
    ],
    []
  )

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 400, width: '100%' }}>
      <style>{`
        /* 병합된 셀이 겹치지 않게 배경색 지정 및 스타일 조정 */
        .cell-span-display {
          background-color: white !important;
          border-bottom: 1px solid #dde2eb !important;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
      `}</style>
      <AgGridReact
        rowData={processedData}
        columnDefs={columnDefs}
        suppressRowTransform={true} // Row Spanning 사용 시 필수 옵션
      />
    </div>
  )
}

export default AgGridSample
