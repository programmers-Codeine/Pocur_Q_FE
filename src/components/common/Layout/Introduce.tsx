export default function Introduce() {
  return (
    <div className="flex w-screen h-screen gap-1.5 p-2 bg-d10">
      <aside className="flex items-center justify-center w-[40%] bg-b100">
        <div>
          <p>내 가게를</p>
          <p>내 손으로</p>
          <p>커스터마이징</p>
        </div>
      </aside>
      <main className="flex items-center justify-center w-[60%] bg-b50">
        <div>
          <p>나만의 멋진 메뉴판을 꾸미고</p>
          <p>실시간으로 주문현황을 확인,</p>
          <p>메뉴를 손쉽게 관리하세요 !</p>
          <p>매출과 통계를 한눈에 파악하고,</p>
          <p>고객 맞춤형 경험을 제공해보세요.</p>
        </div>
      </main>
    </div>
  );
}
