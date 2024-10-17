import { Option, SquareMinus, SquarePlus, Trash } from '@/assets/icons';
import IconButton from '@/components/customer/IconButton';
import { ListItem as TListItem } from '@/stores/useCustomerStore';
import { DesignThemeTypes } from '@/types';

interface ListItemProps {
  item: TListItem;
  theme?: DesignThemeTypes;
  variant: 'order' | 'cart';
  onChangeCartItem?: (item: TListItem) => void;
  onRemoveCartItem?: (id: string) => void;
  onReduceMenuQuantity?: (id: string, quantity: number) => void;
  onIncreaseMenuQuantity?: (id: string, quantity: number) => void;
}

export default function ListItem({
  item,
  variant,
  theme,
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
    <div
      className="flex w-full flex-col gap-1 rounded-lg border border-d80 px-4 py-2"
      style={{ borderColor: theme?.all.boxOutline }}
    >
      <div className="text-xs font-bold text-d200" style={{ color: theme?.all.smallText }}>
        {menu.categoryName}
      </div>
      <div className="text-xl font-bold" style={{ color: theme?.all.largeText }}>
        {menu.menuName}
      </div>
      <div className="text-xs text-d200" style={{ color: theme?.all.smallText }}>
        {menu.options
          .filter(({ isChecked }) => isChecked)
          .map(({ optionName }) => optionName)
          .join('/')}
      </div>
      <div className="text-sm font-bold" style={{ color: theme?.all.largeText }}>
        {totalPrice.toLocaleString()}원
      </div>
      {/* 수량 조절 */}
      {variant === 'cart' && (
        <div className="mt-2 flex items-center justify-between text-xl font-bold">
          <IconButton
            title="옵션 수정"
            sizeVariant="small"
            onClick={handleChangeItem}
            theme={theme}
          >
            <Option style={{ fill: theme?.button.active.textAndIcon }} />
          </IconButton>
          {quantity === 1 ? (
            <button className="flex h-5 w-5 items-center justify-center" onClick={handleDeleteItem}>
              <Trash style={{ fill: theme?.all.icon }} />
            </button>
          ) : (
            <button
              className="flex h-6 w-6 items-center justify-center"
              onClick={handleReduceMenuQuantity}
            >
              <SquareMinus style={{ stroke: theme?.all.icon }} />
            </button>
          )}
          <div className="w-6 text-center" style={{ color: theme?.all.largeText }}>
            {quantity}
          </div>
          <button
            className="flex h-6 w-6 items-center justify-center disabled:text-d80"
            disabled={quantity === 10}
            onClick={handleIncreaseMenuQuantity}
          >
            <SquarePlus style={{ stroke: theme?.all.icon }} />
          </button>
        </div>
      )}
      {variant === 'order' && (
        <div className="flex text-lg" style={{ color: theme?.all.largeText }}>
          주문 수량: <div className="w-6 text-center">{quantity}</div>개
        </div>
      )}
    </div>
  );
}
