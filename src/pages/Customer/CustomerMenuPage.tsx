import { Basket, Bell, List, OrderList } from '@/assets/icons';
import ItemButton from '@/components/common/Button/ItemButton';
import CustomerMenuCard from '@/components/customer/MenuCard';
import {
  ROUTE_CUSTOMER,
  ROUTE_CUSTOMER_CART,
  ROUTE_CUSTOMER_DETAIL_MENU,
  ROUTE_CUSTOMER_FAST_TOOL,
  ROUTE_CUSTOMER_ORDER,
} from '@/constants/routing';
import useMenuStore from '@/stores/useMenuStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerMenuPage() {
  const navigate = useNavigate();
  const { categories, menus } = useMenuStore();
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleChangeCategory = () => {
    // TODO 카테고리 변경
  };
  const handleOpenMenuDetail = () => {
    // TODO 메뉴 상세 화면 열기
    navigate(`/${ROUTE_CUSTOMER}/${ROUTE_CUSTOMER_DETAIL_MENU}`);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* 가게이름 및 네비게이션 */}
      <div className="mr-2 mt-2 flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-r-lg border bg-b50 text-xl font-semibold">
          1
        </div>
        <div className="text-2xl font-bold text-d900">restaurantName</div>
        <nav>
          <ol className="flex gap-3">
            <li className="flex h-7 w-[1.5rem] items-center justify-center">
              <Bell
                onClick={() => {
                  navigate(`/${ROUTE_CUSTOMER}/${ROUTE_CUSTOMER_FAST_TOOL}`);
                }}
              />
            </li>
            <li className="flex h-7 w-[1.6rem] items-center justify-center">
              <Basket
                onClick={() => {
                  navigate(`/${ROUTE_CUSTOMER}/${ROUTE_CUSTOMER_CART}`);
                }}
              />
            </li>
            <li className="flex h-7 w-[1.3rem] items-center justify-center">
              <OrderList
                onClick={() => {
                  navigate(`/${ROUTE_CUSTOMER}/${ROUTE_CUSTOMER_ORDER}`);
                }}
              />
            </li>
          </ol>
        </nav>
      </div>
      {/* 가게 설명 */}
      <div className="mx-3 text-d900">message</div>
      {/* 카테고리 */}
      <div className="flex justify-between gap-2 border-y border-d50 px-1 py-2">
        <div className="flex min-w-[100px] max-w-[390px] gap-2 overflow-x-scroll text-nowrap rounded-md">
          <ItemButton
            data-id={0}
            title="전체"
            state={selectedCategory === 0 ? 'select' : 'normal'}
            onClick={handleChangeCategory}
          />
          {categories.map(({ id, title }) => (
            <ItemButton
              key={id}
              data-id={id}
              title={title}
              state={selectedCategory === id ? 'select' : 'normal'}
              onClick={handleChangeCategory}
            />
          ))}
        </div>
        <div className="flex w-11 items-center justify-center">
          <List
            width={25}
            height={25}
            onClick={() => {
              // TODO 메뉴 목록 출력 형태 변경 로직 list, grid
            }}
          />
        </div>
      </div>
      {/* 메뉴 목록 */}
      <div className="flex flex-col gap-2 px-2">
        {menus
          // 실시간 메뉴에서 액티브인 경우만 소비자 화면에 출력
          // .filter(({ isActive }) => isActive === true)
          .map(menu => (
            <CustomerMenuCard key={menu.id} menu={menu} onOpenMenuDetail={handleOpenMenuDetail} />
          ))}
      </div>
    </div>
  );
}
