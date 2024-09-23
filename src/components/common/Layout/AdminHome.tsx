import { useNavigate } from 'react-router-dom';
import logoPhone from '@/assets/images/pocurq_phone2.png';

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="flex w-screen h-screen gap-1.5 p-2 bg-d10" onClick={() => navigate('/login')}>
      <aside className="flex items-center justify-center w-[40%] bg-b100 relative">
        <img src={logoPhone} className="absolute w-[40%] right-8 bottom-8" />
        <div className="text-6xl text-d900 leading-tight z-10">
          <p className="whitespace-pre-wrap">{`내 가게를\n내 손으로`}</p>
          <p className="text-8xl font-bold">커스터마이징</p>
        </div>
      </aside>
      <main className="flex items-center justify-center w-[60%] bg-b50">
        <p className="whitespace-pre-wrap text-6xl text-d900 font-bold leading-tight">
          {`나만의 멋진 메뉴판`}
          <span className="text-5xl text-d200 font-normal">을 꾸미고</span>
          {`\n실시간`}
          <span className="text-5xl text-d200 font-normal">으로</span>
          {` 주문현황을 확인`}
          <span className="text-5xl text-d200 font-normal">,</span>
          {`\n메뉴`}
          <span className="text-5xl text-d200 font-normal">를 손쉽게</span>
          {` 관리`}
          <span className="text-5xl text-d200 font-normal">하세요 !</span>
          {`\n\n매출과 통계`}
          <span className="text-5xl text-d200 font-normal">를</span>
          {` 한눈에 파악`}
          <span className="text-5xl text-d200 font-normal">하고,</span>
          {`\n고객 맞춤형 경험`}
          <span className="text-5xl text-d200 font-normal">을</span>
          {` 제공`}
          <span className="text-5xl text-d200 font-normal">해보세요.</span>
        </p>
      </main>
    </div>
  );
}
