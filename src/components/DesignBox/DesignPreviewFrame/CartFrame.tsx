import NavHeader from '@/components/customer/NavHeader';
import ListItem from '@/components/customer/ListItem';
import IconButton from '@/components/customer/IconButton';
import { DesignThemeTypes } from '@/types';
import { Card } from '@/assets/icons';

type CartFrameProps = {
  theme: DesignThemeTypes;
};

export default function CartFrame({ theme }: CartFrameProps) {
  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <NavHeader>장바구니</NavHeader>
      <div className="flex flex-1 flex-col items-center gap-2 p-2">
        {/* {[0, 1].map(el => (
          <ListItem key={el} variant="cart" />
        ))} */}
      </div>
      <div className="flex w-full justify-end gap-1 p-2 text-xl font-bold">
        총액:
        <div className="w-24 text-end">10,000원</div>
      </div>
      <div className="self-center py-2">
        <IconButton title="주문하기">
          <Card />
        </IconButton>
      </div>
    </div>
  );
}
