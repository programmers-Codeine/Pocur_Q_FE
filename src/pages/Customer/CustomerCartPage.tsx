import { getCategoryData, getMenuData } from '@/apis/customer.api';

import { Card } from '@/assets/icons';
import IconButton from '@/components/customer/IconButton';
import ListItem from '@/components/customer/ListItem';
import NavHeader from '@/components/customer/NavHeader';
import useCustomerStore, { ListItem as TListItem } from '@/stores/useCustomerStore';
import useThemeStore from '@/stores/useThemeStore';
import useSocketStore from '@/stores/useCustomerSocketStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerCartPage() {
  const navigate = useNavigate();
  const {
    customerTableNo,
    menus,
    setMenus,
    selectMenu,
    cart,
    changeCartItem,
    deleteCartItem,
    clearCartItem,
  } = useCustomerStore();
  const { theme } = useThemeStore();
  const { socket } = useSocketStore();

  const handleChangeCartItem = (item: TListItem) => {
    const selectedMenu = menus.find(menu => menu.menuName === item.menu.menuName);

    if (selectedMenu) {
      selectMenu({ ...selectedMenu, options: item.menu.options });
      navigate('/customer/detail-menu', {
        state: { title: '주문 수정하기', modItem: item },
      });
    } else {
      alert('데이터가 없습니다.');
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
  const handleFetchMenusData = async () => {
    const menuData = await getMenuData();
    const categoryData = await getCategoryData();
    const mappedCategory: { [key: string]: string } = {};

    categoryData
      // 메인요리 카테고리가 항상 맨 앞으로 오고 그 이후에는 생성된 시간으로 오름차순 정렬
      .sort((a, b) =>
        a.categoryName === '메인요리'
          ? -1
          : b.categoryName === '메인요리'
            ? 1
            : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      .forEach(({ id, categoryName }) => {
        mappedCategory[id] = categoryName;
      });

    setMenus(
      menuData.map(menu => ({
        ...menu,
        categoryName: mappedCategory[menu.categoryId],
        options: menu.options.map(option => ({ ...option, isChecked: false })),
      }))
    );
  };

  useEffect(() => {
    handleFetchMenusData();
  }, []);

  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <NavHeader theme={theme}>장바구니</NavHeader>
      {/* 주문 목록 */}
      <div className="flex flex-1 flex-col items-center gap-2 p-2">
        {cart.map(item => (
          <ListItem
            key={item.id}
            item={item}
            theme={theme}
            variant="cart"
            onChangeCartItem={handleChangeCartItem}
            onReduceMenuQuantity={handleReduceMenuQuantity}
            onIncreaseMenuQuantity={handleIncreaseMenuQuantity}
            onRemoveCartItem={handleRemoveCartItem}
          />
        ))}
      </div>
      {/* 총 금액 */}
      <div
        className="flex w-full justify-end gap-1 p-2 text-xl font-bold"
        style={{ color: theme?.all.largeText }}
      >
        총액:
        <div className="w-24 text-end">
          {cart.reduce((a, item) => a + item.totalPrice, 0).toLocaleString()}원
        </div>
      </div>
      {/* 주문 버튼 */}
      <div className="self-center py-2">
        <IconButton
          title="주문하기"
          theme={theme}
          onClick={() => {
            socket.emit(
              'placeOrder',
              cart.map(({ menu, quantity }) => ({
                menuId: menu.menuId,
                count: quantity,
                tableNum: customerTableNo,
                optionIds: menu.options
                  .filter(({ isChecked }) => isChecked === true)
                  .map(({ id }) => id),
              }))
            );
            clearCartItem();
          }}
        >
          <Card style={{ fill: theme.button.active.textAndIcon }} />
        </IconButton>
      </div>
    </div>
  );
}
