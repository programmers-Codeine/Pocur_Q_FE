import { Option, SquareMinus, SquarePlus, Trash } from '@/assets/icons';
import IconButton from '@/components/customer/IconButton';
import { ListItem as TListItem } from '@/stores/useCustomerStore';
import { useState } from 'react';

interface ListItemProps {
  item?: TListItem; // 타입 재정의 후 사용예정
  variant: 'order' | 'cart';
  onRemoveCartItem?: () => {};
  onReduceMenuQuantity?: () => {};
  onIncreaseMenuQuantity?: () => {};
}

export default function ListItem({ variant }: ListItemProps) {
  const [menuQuantity] = useState(1);

  return (
    <div className="flex w-full flex-col gap-1 rounded-lg border border-d80 px-4 py-2">
      <div className="text-xs font-bold text-d200">category</div>
      <div className="text-xl font-bold">menu name</div>
      <div className="text-xs text-d200">options</div>
      <div className="text-sm font-bold">order price</div>
      {/* 수량 조절 */}
      {variant === 'cart' && (
        <div className="mt-2 flex items-center justify-between text-xl font-bold">
          <IconButton
            title="옵션 수정"
            sizeVariant="small"
            onClick={() => {
              // TODO 옵션 수정 로직
              // 메뉴 상세 페이지로 다시 이동 후 재주문 방식(기존 주문 삭제)
            }}
          >
            <Option />
          </IconButton>
          {menuQuantity === 1 ? (
            <button className="flex h-5 w-5 items-center justify-center">
              <Trash />
            </button>
          ) : (
            <button className="flex h-6 w-6 items-center justify-center">
              <SquareMinus />
            </button>
          )}
          <div className="w-6 text-center">{menuQuantity}</div>
          <button
            className="flex h-6 w-6 items-center justify-center disabled:text-d80"
            disabled={menuQuantity === 10}
          >
            <SquarePlus />
          </button>
        </div>
      )}
      {variant === 'order' && (
        <div className="flex text-lg">
          주문 수량: <div className="w-6 text-center">{1}</div>개
        </div>
      )}
    </div>
  );
}
