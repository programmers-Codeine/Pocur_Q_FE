import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex w-screen h-screen gap-1.5 p-2 bg-d900">
      <aside className="w-[25%] bg-d10 p-8 rounded-l-[30px]">{/*SideBar 컴포넌트 작성*/}</aside>
      <main className="w-[75%] bg-d10 rounded-r-[30px]">
        <Outlet />
      </main>
    </div>
  );
}
