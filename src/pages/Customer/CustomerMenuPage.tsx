import { Basket, Bell, List, OrderList } from '@/assets/icons';
import { getCategoryData, getMenuData, getRestaurantData } from '@/apis/customer.api';
import ItemButton from '@/components/common/Button/ItemButton';
import CustomerMenuCard from '@/components/customer/MenuCard';
import {
  ROUTE_CUSTOMER,
  ROUTE_CUSTOMER_CART,
  ROUTE_CUSTOMER_DETAIL_MENU,
  ROUTE_CUSTOMER_FAST_TOOL,
  ROUTE_CUSTOMER_ORDER,
} from '@/constants/routing';
import useCustomerStore, { Menu } from '@/stores/useCustomerStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function CustomerMenuPage() {
  const navigate = useNavigate();
  const {
    customerTableNo,
    restaurantInfo,
    categories,
    menus,
    selectedCategory,
    selectMenu,
    changeCategory,
    setRestaurantInfo,
    setCategories,
    setMenus,
  } = useCustomerStore();

  const handleFetchData = async () => {
    try {
      const restaurantData = await getRestaurantData();
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

      setRestaurantInfo({
        name: restaurantData.name,
        introduce: restaurantData.introduce,
        logo: restaurantData.logo,
      });

      setCategories(mappedCategory);

      setMenus(
        menuData.map(menu => ({
          ...menu,
          categoryName: mappedCategory[menu.categoryId],
          options: menu.options.map(option => ({ ...option, isChecked: false })),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeCategory = (category: string) => {
    changeCategory(category);
  };
  const handleOpenMenuDetail = (menu: Menu) => {
    selectMenu(menu);
    navigate(`/${ROUTE_CUSTOMER}/${ROUTE_CUSTOMER_DETAIL_MENU}`);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {/* 가게이름 및 네비게이션 */}
      <div className="mr-2 mt-2 flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-r-lg border bg-b50 text-xl font-semibold">
          {customerTableNo}
        </div>
        <div className="text-2xl font-bold text-d900">{restaurantInfo?.name}</div>
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
      <div className="mx-3 text-d900">{restaurantInfo?.introduce}</div>
      {/* 카테고리 */}
      <div className="flex justify-between gap-2 border-y border-d50 px-1 py-2">
        <div className="flex min-w-[100px] max-w-[390px] gap-2 overflow-x-scroll text-nowrap rounded-md">
          <ItemButton
            title="전체"
            state={selectedCategory === '' ? 'select' : 'normal'}
            onClick={() => handleChangeCategory('')}
          />
          {Object.values(categories).map(category => (
            <ItemButton
              key={category}
              title={category}
              state={selectedCategory === category ? 'select' : 'normal'}
              onClick={() => handleChangeCategory(category)}
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
          .filter(({ isActive }) => isActive === true)
          // 카테고리 필터링
          .filter(({ categoryName }) => {
            if (selectedCategory === '') return true;
            return categoryName === selectedCategory;
          })
          .map(menu => (
            <CustomerMenuCard
              key={menu.id}
              menu={menu}
              onOpenMenuDetail={() => handleOpenMenuDetail(menu)}
            />
          ))}
      </div>
    </div>
  );
}
