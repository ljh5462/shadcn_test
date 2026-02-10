import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card'

export default function Home() {
  return (
    <div className="space-y-6 w-3/4">
      <h1 className="text-3xl font-bold">환영합니다!</h1>
      <p>
        이 페이지는 shadcn/ui와 Tailwind CSS로 구현된 반응형 레이아웃 내부에
        있습니다.
      </p>

      {/* 반응형 카드 그리드 예시 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>카드 1</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              이 카드는 화면 크기에 따라 자동으로 재배열됩니다.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>카드 2</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              모바일에서는 세로로, 큰 화면에서는 가로로 배치됩니다.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>카드 3</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Tailwind의 `grid-cols-N` 클래스를 활용합니다.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <p>브라우저 크기를 조절하여 반응형 동작을 확인해보세요.</p>
    </div>
  )
}
