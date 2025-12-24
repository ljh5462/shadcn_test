'use client'

import React, { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

const ITEMS_PER_PAGE = 10
const data = Array.from({ length: 100 }, (_, i) => `아이템 ${i + 1}`)

export function CustomPagination() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)

  // 현재 페이지에 해당하는 데이터 추출
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // 보여줄 페이지 번호를 계산하는 함수
  const getPageNumbers = () => {
    const pages = []
    const showMax = 5 // 한 번에 보여줄 최대 번호 개수(생략 기호 제외)

    if (totalPages <= showMax) {
      // 전체 페이지가 5개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      // 1. 항상 첫 페이지 포함
      pages.push(1)

      if (currentPage > 3) {
        pages.push('ellipsis')
      }

      // 2. 현재 페이지 주변 번호 계산
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }

      // 3. 항상 마지막 페이지 포함
      if (!pages.includes(totalPages)) {
        pages.push(totalPages)
      }
    }
    return pages
  }
  return (
    <div className="p-4 w-full space-y-4">
      {/* 데이터 출력부 */}
      <ul className="border rounded-md p-4 bg-slate-50">
        {currentItems.map(item => (
          <li
            key={item}
            className="py-1 border-bottom last:border-0">
            {item}
          </li>
        ))}
      </ul>

      {/* shadcn Pagination UI */}
      <Pagination>
        <PaginationContent>
          {/* 이전 버튼 */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={e => {
                e.preventDefault()
                setCurrentPage(p => Math.max(1, p - 1))
              }}
            />
          </PaginationItem>

          {/* 숫자 및 생략 기호 표시 */}
          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === 'ellipsis' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={e => {
                    e.preventDefault()
                    setCurrentPage(page as number)
                  }}>
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* 다음 버튼 */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={e => {
                e.preventDefault()
                setCurrentPage(p => Math.min(totalPages, p + 1))
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
