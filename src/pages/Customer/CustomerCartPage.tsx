import { Card } from '@/assets/icons';
import IconButton from '@/components/customer/IconButton';
import ListItem from '@/components/customer/ListItem';
import NavHeader from '@/components/customer/NavHeader';

export default function CustomerCartPage() {
  const handleRemoveCartItem = () => {
    // TODO 장바구니 아이템 삭제 로직
  };
  const handleReduceMenuQuantity = () => {
    // TODO 수량 변경 로직
    // TODO 실제 장바구니 내용 변경 로직
  };
  const handleIncreaseMenuQuantity = () => {
    // TODO 수량 변경 로직
    // TODO 실제 장바구니 내용 변경 로직
  };

  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <NavHeader>장바구니</NavHeader>
      {/* 주문 목록 */}
      <div className="flex flex-1 flex-col items-center gap-2 p-2">
        {[0, 1].map(el => (
          <ListItem
            key={el}
            variant="cart"
            onReduceMenuQuantity={handleReduceMenuQuantity}
            onIncreaseMenuQuantity={handleIncreaseMenuQuantity}
            onRemoveCartItem={handleRemoveCartItem}
          />
        ))}
      </div>
      {/* 총 금액 */}
      <div className="flex w-full justify-end gap-1 p-2 text-xl font-bold">
        총액:
        <div className="w-24 text-end">10,000원</div>
      </div>
      {/* 주문 버튼 */}
      <div className="self-center py-2">
        <IconButton title="주문하기" onClick={() => {}}>
          <Card />
        </IconButton>
      </div>
    </div>
  );
}
