import { SideBarProps } from './SideBar.types';
import Button from '../common/Button/Button';

export default function SideBar({ current, list, handleChangeCurrent }: SideBarProps) {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      {list.map(item => (
        <Button
          key={item.id}
          title={item.name}
          type="menu"
          state={current === item.src ? 'active' : 'normal'}
          onClick={() => handleChangeCurrent(item.src)}
        ></Button>
      ))}
    </div>
  );
}
