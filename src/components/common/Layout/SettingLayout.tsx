import { Outlet } from 'react-router-dom';

export default function SettingLayout() {
  return (
    <div className="h-full w-full p-10">
      <Outlet />
    </div>
  );
}
