import { useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import logoPhone from '@/assets/images/pocurq_phone2.png';

export default function AdminHomeLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLoginPage = () => {
    if (pathname === '/') return navigate('/login');
  };

  return (
    <div
      className={`flex h-screen w-screen gap-1.5 bg-d10 p-2 ${pathname === '/' && 'cursor-pointer'}`}
      onClick={handleLoginPage}
    >
      <aside className="relative flex w-[40%] items-center justify-center bg-b100">
        <img src={logoPhone} className="absolute bottom-8 right-8 w-[40%]" />
        <div className="z-10 text-6xl leading-tight text-d900">
          <p className="whitespace-pre-wrap">{`내 가게를\n내 손으로`}</p>
          <p className="text-8xl font-bold">커스터마이징</p>
        </div>
      </aside>
      <main className="flex w-[60%] items-center justify-center bg-b50">
        {pathname === '/' ? (
          <p className="whitespace-pre-wrap text-6xl font-bold leading-tight text-d900">
            {`나만의 멋진 메뉴판`}
            <span className="text-5xl font-normal text-d200">을 꾸미고</span>
            {`\n실시간`}
            <span className="text-5xl font-normal text-d200">으로</span>
            {` 주문현황을 확인`}
            <span className="text-5xl font-normal text-d200">,</span>
            {`\n메뉴`}
            <span className="text-5xl font-normal text-d200">를 손쉽게</span>
            {` 관리`}
            <span className="text-5xl font-normal text-d200">하세요 !</span>
            {`\n\n매출과 통계`}
            <span className="text-5xl font-normal text-d200">를</span>
            {` 한눈에 파악`}
            <span className="text-5xl font-normal text-d200">하고,</span>
            {`\n고객 맞춤형 경험`}
            <span className="text-5xl font-normal text-d200">을</span>
            {` 제공`}
            <span className="text-5xl font-normal text-d200">해보세요.</span>
          </p>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
