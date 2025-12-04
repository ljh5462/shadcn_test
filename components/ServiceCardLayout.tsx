// components/ServiceCardLayout.tsx

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// 1. 데이터 타입 정의
interface ServiceItem {
  id: number;
  title: string;
  description: string;
}

// 2. Props 타입 정의: ServiceItem 배열을 받음
interface ServiceCardLayoutProps {
  items: ServiceItem[];
}

const ServiceCardLayout: React.FC<ServiceCardLayoutProps> = ({ items }) => {
  return (
    // ⭐ 반응형 그리드 컨테이너: 모바일(flex-col), 중간(flex-row/wrap), 큰화면(grid-cols-3)
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap lg:grid lg:grid-cols-3">
      {items.map((item) => (
        
        // 각 카드 항목
        <Card key={item.id} className="w-full md:w-[calc(50%-0.5rem)] lg:w-auto">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription className="text-sm">
              {item.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Button variant="outline">자세히 보기</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceCardLayout;