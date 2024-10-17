import { Bell, Basket, OrderList, List } from '@/assets/icons';
import ItemButton from '@/components/common/Button/ItemButton';
import CustomerMenuCard from '@/components/customer/CustomerMenuCard';
import { DesignThemeTypes } from '@/types';

type MenuFrameProps = {
  theme: DesignThemeTypes;
};
const menuDatas = [
  {
    categoryId: 'ac449681-7c4b-4974-adef-a86f39944eaf',
    categoryName: '파스타류',
    created_at: '2024-10-07T06:25:36.000Z',
    hot: false,
    id: '236a16dc-08fc-43a4-a91c-2c759fe50be1',
    isActive: true,
    isRunningOut: false,
    menuDetail: '1번 토마토파스타',
    menuImg: '',
    menuName: '토마토파스타',
    new: false,
    options: [],
    origin: '없음',
    price: 10000,
    soldOut: false,
    updated_at: '2024-10-14',
  },
  {
    categoryId: 'ac449681-7c4b-4974-adef-a86f39944eaf',
    categoryName: '파스타류',
    created_at: '2024-10-07T06:25:36.000Z',
    hot: true,
    id: '236a16dc-08fc-43a4-a91c-2c759fe50be1',
    isActive: true,
    isRunningOut: false,
    menuDetail: '1번 토마토파스타',
    menuImg: '',
    menuName: '토마토파스타',
    new: false,
    options: [],
    origin: '없음',
    price: 10000,
    soldOut: false,
    updated_at: '2024-10-14',
  },
  {
    categoryId: 'ac449681-7c4b-4974-adef-a86f39944eaf',
    categoryName: '파스타류',
    created_at: '2024-10-07T06:25:36.000Z',
    hot: false,
    id: '236a16dc-08fc-43a4-a91c-2c759fe50be1',
    isActive: true,
    isRunningOut: false,
    menuDetail: '1번 토마토파스타',
    menuImg: '',
    menuName: '토마토파스타',
    new: true,
    options: [],
    origin: '없음',
    price: 10000,
    soldOut: false,
    updated_at: '2024-10-14',
  },
  {
    categoryId: 'ac449681-7c4b-4974-adef-a86f39944eaf',
    categoryName: '파스타류',
    created_at: '2024-10-07T06:25:36.000Z',
    hot: false,
    id: '236a16dc-08fc-43a4-a91c-2c759fe50be1',
    isActive: true,
    isRunningOut: false,
    menuDetail: '1번 토마토파스타',
    menuImg: '',
    menuName: '토마토파스타',
    new: false,
    options: [],
    origin: '없음',
    price: 10000,
    soldOut: true,
    updated_at: '2024-10-14',
  },
];
export default function MenuFrame({ theme }: MenuFrameProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="mr-2 mt-2 flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-r-lg border bg-b50 text-xl font-semibold"
          style={{ backgroundColor: theme.all.box, color: theme.all.largeText }}
        >
          1
        </div>
        <div className="text-2xl font-bold text-d900" style={{ color: theme.all.largeText }}>
          식당 이름
        </div>
        <nav>
          <ol className="flex gap-3">
            <li className="flex h-7 w-[1.5rem] items-center justify-center">
              <Bell style={{ fill: theme.all.icon }} />
            </li>
            <li className="flex h-7 w-[1.6rem] items-center justify-center">
              <Basket style={{ fill: theme.all.icon }} />
            </li>
            <li className="flex h-7 w-[1.3rem] items-center justify-center">
              <OrderList style={{ stroke: theme.all.icon }} />
            </li>
          </ol>
        </nav>
      </div>
      <div className="mx-3 text-d900" style={{ color: theme.all.smallText }}>
        가게 소개란
      </div>
      <div className="flex justify-between gap-2 border-y border-d50 px-1 py-2">
        <div className="flex min-w-[100px] max-w-[390px] gap-2 overflow-x-scroll text-nowrap rounded-md">
          <ItemButton title="카테고리 1" state="select" theme={theme} />
          <ItemButton title="카테고리 2" state="normal" theme={theme} />
          <ItemButton title="카테고리 3" state="normal" theme={theme} />
          <ItemButton title="카테고리 4" state="normal" theme={theme} />
        </div>
        <div className="flex w-11 items-center justify-center">
          <List width={25} height={25} />
        </div>
      </div>
      <div className="flex flex-col gap-2 px-2">
        {menuDatas.map((menuData, idx) => (
          <CustomerMenuCard
            theme={{
              largeText: theme.all.largeText,
              smallText: theme.all.smallText,
              box: theme.all.box,
              boxBorder: theme.all.boxOutline,
              icon: theme.all.icon,
              hot: theme.addOption.label.hot,
              new: theme.addOption.label.new,
              soldOut: theme.addOption.label.soldOut,
            }}
            key={idx}
            menu={menuData}
          />
        ))}
      </div>
    </div>
  );
}
