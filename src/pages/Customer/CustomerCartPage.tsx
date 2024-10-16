import { Card } from '@/assets/icons';
import IconButton from '@/components/customer/IconButton';
import ListItem from '@/components/customer/ListItem';
import NavHeader from '@/components/customer/NavHeader';
import useCustomerStore, { ListItem as TListItem } from '@/stores/useCustomerStore';
import { useNavigate } from 'react-router-dom';

export default function CustomerCartPage() {
  const navigate = useNavigate();
  const { menus, selectMenu, cart, changeCartItem, deleteCartItem } = useCustomerStore();

  const handleChangeCartItem = (item: TListItem) => {
    const selectedMenu = menus.find(menu => menu.menuName === item.menu.menuName);

    if (selectedMenu) {
      selectMenu(selectedMenu);
      navigate('/customer/detail-menu', {
        state: { title: '주문 수정하기', modItem: item },
      });
    }
  };
  const handleRemoveCartItem = (id: string) => {
    deleteCartItem(id);
  };
  const handleReduceMenuQuantity = (id: string, quantity: number) => {
    changeCartItem(id, quantity - 1);
  };
  const handleIncreaseMenuQuantity = (id: string, quantity: number) => {
    changeCartItem(id, quantity + 1);
  };

  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <NavHeader>장바구니</NavHeader>
      {/* 주문 목록 */}
      <div className="flex flex-1 flex-col items-center gap-2 p-2">
        {cart.map(item => (
          <ListItem
            key={item.id}
            item={item}
            variant="cart"
            onChangeCartItem={handleChangeCartItem}
            onReduceMenuQuantity={handleReduceMenuQuantity}
            onIncreaseMenuQuantity={handleIncreaseMenuQuantity}
            onRemoveCartItem={handleRemoveCartItem}
          />
        ))}
      </div>
      {/* 총 금액 */}
      <div className="flex w-full justify-end gap-1 p-2 text-xl font-bold">
        총액:
        <div className="w-24 text-end">
          {cart.reduce((a, item) => a + item.totalPrice, 0).toLocaleString()}원
        </div>
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
