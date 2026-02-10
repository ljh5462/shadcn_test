import React, { useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import {
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  AllCommunityModule,
  RowSpanParams
} from 'ag-grid-community'

// 필수 모듈 등록 (v32+)
ModuleRegistry.registerModules([AllCommunityModule])

interface IRowData {
  month: string
  seq: number
  aPNum: number
  aRNum: number
  rowSpan?: number
  isSummary?: boolean // 누계 행 여부 구분용
}

const ComplexGrid: React.FC = () => {
  const processedData = useMemo(() => {
    // 1. 기초 데이터 (1월 데이터 1,2,3 추가)
    const rawData = [
      { month: '2026-01', seq: 1, aPNum: 100000, aRNum: 90000, rowSpan: 0 },
      { month: '2026-01', seq: 2, aPNum: 120000, aRNum: 110000, rowSpan: 0 },
      { month: '2026-01', seq: 3, aPNum: 110000, aRNum: 105000, rowSpan: 0 },
      { month: '2026-02', seq: 1, aPNum: 200000, aRNum: 180000, rowSpan: 0 },
      { month: '2026-02', seq: 2, aPNum: 210000, aRNum: 200000, rowSpan: 0 }
    ]

    const result: IRowData[] = []
    const months = Array.from(new Set(rawData.map(d => d.month)))

    let yearlyAccP = 0 // 연 누계용 변수
    let yearlyAccR = 0

    months.forEach(m => {
      // 해당 월의 일반 데이터 필터링
      const monthData = rawData.filter(d => d.month === m)

      // 월 누계 계산 (seq 1~10번 합계)
      const monthSumP = monthData.reduce((acc, cur) => acc + cur.aPNum, 0)
      const monthSumR = monthData.reduce((acc, cur) => acc + cur.aRNum, 0)

      // 연 누계 누적
      yearlyAccP += monthSumP
      yearlyAccR += monthSumR

      // 데이터 결합: 일반 데이터 + 월 누계(998) + 연 누계(999)
      const combined = [
        ...monthData,
        {
          month: m,
          seq: 998,
          aPNum: monthSumP,
          aRNum: monthSumR,
          isSummary: true,
          rowSpan: 0
        },
        {
          month: m,
          seq: 999,
          aPNum: yearlyAccP,
          aRNum: yearlyAccR,
          isSummary: true,
          rowSpan: 0
        }
      ]

      // RowSpan 계산: 이 월에 총 몇 개의 행이 있는지 기록
      combined.forEach((row, idx) => {
        if (idx === 0) {
          row.rowSpan = combined.length // 첫 행에만 전체 개수 부여
        } else {
          row.rowSpan = 0 // 나머지 행은 병합됨
        }
        result.push(row)
      })
    })

    return result
  }, [])

  const columnDefs = useMemo<(ColDef<IRowData> | ColGroupDef<IRowData>)[]>(
    () => [
      {
        headerName: '기본 정보',
        children: [
          {
            field: 'month',
            headerName: '기준월',
            rowSpan: (params: RowSpanParams) => params.data?.rowSpan || 1,
            cellClassRules: {
              'show-span-cell': p => (p.data?.rowSpan || 0) > 0
            },
            width: 120
          },
          {
            field: 'seq',
            headerName: '구분',
            width: 100,
            valueFormatter: p => {
              if (p.value === 998) return '월 누계'
              if (p.value === 999) return '연 누계'
              return p.value
            }
          }
        ]
      },
      {
        headerName: '성과 수치',
        children: [
          {
            field: 'aPNum',
            headerName: '계획',
            valueFormatter: p => p.value?.toLocaleString(),
            cellStyle: p =>
              p.data?.isSummary
                ? { backgroundColor: '#fdfdfd', fontWeight: 'bold' }
                : null
          },
          {
            field: 'aRNum',
            headerName: '실적',
            valueFormatter: p => p.value?.toLocaleString(),
            cellStyle: p =>
              p.data?.isSummary
                ? { backgroundColor: '#fdfdfd', fontWeight: 'bold' }
                : null
          }
        ]
      }
    ],
    []
  )

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 600, width: '100%' }}>
      <style>{`
        .show-span-cell {
          background-color: #ffffff !important;
          border-bottom: 1px solid #dde2eb !important;
          display: flex; align-items: center; justify-content: center;
          font-weight: bold;
        }
        .ag-row-summary { background-color: #fafafa !important; }
      `}</style>
      <AgGridReact
        rowData={processedData}
        columnDefs={columnDefs}
        suppressRowTransform={true}
        defaultColDef={{ flex: 1, resizable: true }}
        getRowClass={params => (params.data?.isSummary ? 'ag-row-summary' : '')}
      />
    </div>
  )
}

export default ComplexGrid
