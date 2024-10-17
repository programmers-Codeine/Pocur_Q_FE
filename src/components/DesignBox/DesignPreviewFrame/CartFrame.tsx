import NavHeader from '@/components/customer/NavHeader';
import ListItem from '@/components/customer/ListItem';
import IconButton from '@/components/customer/IconButton';
import { DesignThemeTypes } from '@/types';
import { Card } from '@/assets/icons';

type CartFrameProps = {
  theme: DesignThemeTypes;
};

const cart = [
  {
    id: '1729099786727',
    menu: { menuId: '', categoryName: '사이드2', menuName: '짜장면', options: [], price: 8000 },
    quantity: 1,
    totalPrice: 9600,
  },

  {
    id: '1729099875749',
    menu: { menuId: '', categoryName: '사이드2', menuName: '짜장면', options: [], price: 8000 },
    quantity: 3,
    totalPrice: 27300,
  },
];

export default function CartFrame({ theme }: CartFrameProps) {
  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <NavHeader theme={theme} isAdmin={true}>
        장바구니
      </NavHeader>
      <div className="flex flex-1 flex-col items-center gap-2 p-2">
        {cart.map(item => (
          <ListItem key={item.id} item={item} variant="cart" theme={theme} />
        ))}
      </div>
      <div
        className="flex w-full justify-end gap-1 p-2 text-xl font-bold"
        style={{ color: theme?.all.largeText }}
      >
        총액:
        <div className="w-24 text-end">10,000원</div>
      </div>
      <div className="self-center py-2">
        <IconButton title="주문하기" theme={theme}>
          <Card style={{ fill: theme.button.active.textAndIcon }} />
        </IconButton>
      </div>
    </div>
  );
}
