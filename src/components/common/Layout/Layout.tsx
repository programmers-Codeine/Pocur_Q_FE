import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      {/* Frame 적용 */}
      <aside>{/* SideBar 컴포넌트 작성 */}</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
