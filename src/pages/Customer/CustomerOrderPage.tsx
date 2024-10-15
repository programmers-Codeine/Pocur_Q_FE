import ListItem from '@/components/customer/ListItem';
import NavHeader from '@/components/customer/NavHeader';

export default function CustomerOrderPage() {
  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <NavHeader>주문 내역</NavHeader>
      {/* 총 금액 */}
      <div className="flex w-full justify-center gap-1 p-2 text-xl font-bold">
        총액:
        <div className="w-24 text-end">10,000원</div>
      </div>
      {/* 주문 목록 */}
      <div className="flex flex-1 flex-col items-center gap-2 p-2">
        {[0, 1].map(el => (
          <ListItem key={el} variant="order" />
        ))}
      </div>
    </div>
  );
}
