import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex w-screen h-screen gap-1.5 p-2 bg-d900">
      <aside className="w-[25%] bg-d10 p-8 rounded-l-[30px]">
        {/*
        TODO: SideBar 컴포넌트 구현
        - SideBar 이전의 Button 컴포넌트를 완성시킬 것.
        - /manage, /setting 라우팅에따른 다른 형태의 SideBar 구현필요
        */}
      </aside>
      <main className="w-[75%] bg-d10 rounded-r-[30px]">
        <Outlet />
      </main>
    </div>
  );
}
