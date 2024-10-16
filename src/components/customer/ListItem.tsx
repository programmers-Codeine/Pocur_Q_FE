import { Option, SquareMinus, SquarePlus, Trash } from '@/assets/icons';
import IconButton from '@/components/customer/IconButton';
import { ListItem as TListItem } from '@/stores/useCustomerStore';

interface ListItemProps {
  item: TListItem;
  variant: 'order' | 'cart';
  onChangeCartItem?: (item: TListItem) => void;
  onRemoveCartItem?: (id: string) => void;
  onReduceMenuQuantity?: (id: string, quantity: number) => void;
  onIncreaseMenuQuantity?: (id: string, quantity: number) => void;
}

export default function ListItem({
  item,
  variant,
  onChangeCartItem,
  onRemoveCartItem,
  onReduceMenuQuantity,
  onIncreaseMenuQuantity,
}: ListItemProps) {
  const { id, menu, quantity, totalPrice } = item;

  const handleChangeItem = () => {
    if (variant === 'cart' && onChangeCartItem) {
      onChangeCartItem(item);
    }
  };
  const handleDeleteItem = () => {
    if (variant === 'cart' && onRemoveCartItem) {
      onRemoveCartItem(id);
    }
  };
  const handleIncreaseMenuQuantity = () => {
    if (variant === 'cart' && onIncreaseMenuQuantity) {
      onIncreaseMenuQuantity(id, quantity);
    }
  };
  const handleReduceMenuQuantity = () => {
    if (variant === 'cart' && onReduceMenuQuantity) {
      onReduceMenuQuantity(id, quantity);
    }
  };

  return (
    <div className="flex w-full flex-col gap-1 rounded-lg border border-d80 px-4 py-2">
      <div className="text-xs font-bold text-d200">{menu.categoryName}</div>
      <div className="text-xl font-bold">{menu.menuName}</div>
      <div className="text-xs text-d200">
        {menu.options.map(option => option.optionName).join('/')}
      </div>
      <div className="text-sm font-bold">{totalPrice.toLocaleString()}원</div>
      {/* 수량 조절 */}
      {variant === 'cart' && (
        <div className="mt-2 flex items-center justify-between text-xl font-bold">
          <IconButton title="옵션 수정" sizeVariant="small" onClick={handleChangeItem}>
            <Option />
          </IconButton>
          {quantity === 1 ? (
            <button className="flex h-5 w-5 items-center justify-center" onClick={handleDeleteItem}>
              <Trash />
            </button>
          ) : (
            <button
              className="flex h-6 w-6 items-center justify-center"
              onClick={handleReduceMenuQuantity}
            >
              <SquareMinus />
            </button>
          )}
          <div className="w-6 text-center">{quantity}</div>
          <button
            className="flex h-6 w-6 items-center justify-center disabled:text-d80"
            disabled={quantity === 10}
            onClick={handleIncreaseMenuQuantity}
          >
            <SquarePlus />
          </button>
        </div>
      )}
      {variant === 'order' && (
        <div className="flex text-lg">
          주문 수량: <div className="w-6 text-center">{quantity}</div>개
        </div>
      )}
    </div>
  );
}
