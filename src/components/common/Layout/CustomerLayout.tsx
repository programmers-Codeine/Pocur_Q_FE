import { Outlet } from 'react-router-dom';

export default function CustomerLayout() {
  return (
    <div className="flex h-screen w-full items-center justify-around bg-b50">
      <div className="max-[1024px]:hidden lg:text-lg lg:font-bold lg:text-gray-700">
        Customer Page in DeskTop
      </div>

      <div className="customer:w-[430px] h-full w-full border border-d10 bg-d10 shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}
