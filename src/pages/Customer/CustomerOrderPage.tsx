import { getOrderData } from '@/apis/customer.api';
import ListItem from '@/components/customer/ListItem';
import NavHeader from '@/components/customer/NavHeader';
import useCustomerStore from '@/stores/useCustomerStore';
import useThemeStore from '@/stores/useThemeStore';
import { useEffect } from 'react';

export default function CustomerOrderPage() {
  const { customerTableNo, orders, setOrders } = useCustomerStore();
  const { theme } = useThemeStore();

  const handleFetchOrderData = async () => {
    try {
      const orderData = await getOrderData(customerTableNo);

      setOrders(
        orderData.map(({ id, menu, count, totalPrice, options }) => ({
          id,
          menu: {
            categoryName: '메인',
            menuName: menu.menuName,
            options: options.map(option => ({
              ...option,
              menuId: menu.id,
              isChecked: false,
            })),
            price: menu.price,
          },
          quantity: count,
          totalPrice,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchOrderData();
  }, []);

  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <NavHeader theme={theme}>주문 내역</NavHeader>
      {/* 총 금액 */}
      <div
        className="flex w-full justify-center gap-1 p-2 text-xl font-bold"
        style={{ color: theme.all.largeText }}
      >
        총액:
        <div className="w-24 text-end">
          {orders.reduce((a, order) => a + order.totalPrice, 0).toLocaleString()}원
        </div>
      </div>
      {/* 주문 목록 */}
      <div className="flex flex-1 flex-col items-center gap-2 p-2">
        {orders.map(order => (
          <ListItem key={order.id} item={order} variant="order" theme={theme} />
        ))}
      </div>
    </div>
  );
}
