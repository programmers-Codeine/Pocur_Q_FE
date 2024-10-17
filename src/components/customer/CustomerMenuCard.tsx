import { NoImage } from '@/assets/icons';
import MenuOption from '@/components/customer/MenuOption';
import { Menu } from '@/stores/useCustomerStore';
import clsx from 'clsx';

interface CustomerMenuCardProps {
  menu: Menu;
  theme?: {
    largeText: string;
    smallText: string;
    box: string;
    boxBorder: string;
    icon: string;
    hot: string;
    new: string;
    soldOut: string;
  };
  onOpenMenuDetail?: () => void;
}

export default function CustomerMenuCard({ menu, theme, onOpenMenuDetail }: CustomerMenuCardProps) {
  const { menuName, menuDetail, price, menuImg } = menu;

  console.log(theme);
  return (
    <div
      className={clsx(
        'flex items-center gap-1 text-d900'
        // (menu.hot || menu.new || menu.soldOut) && 'pt-5'
      )}
      style={{ backgroundColor: theme?.box, border: `1px solid ${theme?.boxBorder}` }}
      onClick={onOpenMenuDetail}
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <MenuOption
          optType={menu.hot ? 'hot' : menu.new ? 'new' : menu.soldOut ? 'soldOut' : ''}
          color={menu.soldOut ? theme?.soldOut : menu.new ? theme?.new : menu.hot ? theme?.hot : ''}
        />
        {menuImg === '' ? (
          <NoImage style={{ stroke: theme?.icon }} />
        ) : (
          <img src={menuImg} alt="메뉴 이미지" />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-evenly gap-1 px-1">
        <div className="text-base font-bold" style={{ color: theme?.largeText }}>
          {menuName}
        </div>
        <div className="text-xs text-d200" style={{ color: theme?.smallText }}>
          {menuDetail}
        </div>
        <div
          className="text-right text-sm font-bold"
          style={{ color: theme?.largeText, opacity: 0.9 }}
        >
          {price.toLocaleString()}원
        </div>
      </div>
    </div>
  );
}
