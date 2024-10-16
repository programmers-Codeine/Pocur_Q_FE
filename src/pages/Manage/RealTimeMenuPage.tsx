import { Search } from '@/assets/icons';
import Input from '@/components/common/Input/Input';
import useMenuStore, { Menu } from '@/stores/useMenuStore';
import { ChangeEvent, useEffect, useState } from 'react';
import MenuCard from './RealTimeMenu/MenuCard';
import LabelCard from './RealTimeMenu/LabelCard';
import { labels } from '@/stores/labelData';
import { applyMenu, getMenu } from '@/apis/setting/menu.api';

export default function RealTimeMenuPage() {
  const [search, setSearch] = useState('');
  const { menus, setMenu } = useMenuStore();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSelectLabel = (menu: Menu, id: string, isActive: boolean) => {
    applyMenu(
      {
        categoryId: menu.category,
        menuName: menu.title,
        price: menu.price,
        menuDetail: menu.description,
        menuImg: menu.image ?? '',
        origin: menu.origin,
        isActive: isActive,
        soldOut: id === 'soldOut',
        hot: id === 'hot',
        new: id === 'new',
        isRunningOut: false,
      },
      menu.id
    );
  };

  useEffect(() => {
    getMenu().then(menuData => {
      setMenu(menuData);
    });
  }, []);

  return (
    <div className="relative flex h-full flex-col gap-5 p-10">
      <div className="flex w-full flex-col items-center rounded-lg border border-d50">
        <div className="py-3 text-2xl font-bold">라벨</div>
        <div className="flex gap-4 py-4">
          {labels.map(({ id, title, color }) => (
            <LabelCard key={id} title={title} labelColor={color} />
          ))}
        </div>
      </div>
      <div className="w-full rounded-lg border border-d50 p-4">
        <div className="text-2xl font-semibold">메뉴 목록</div>
        <div className="my-4 border-y border-d50 py-4">
          <Input
            id="search"
            type="text"
            placeholder="메뉴 이름 검색"
            value={search}
            handleInputChange={handleInputChange}
          >
            <Search width="16" height="16" className="stroke-d50" />
          </Input>
        </div>
        <div className="flex flex-wrap gap-14">
          {menus.map(menu => (
            <MenuCard menu={menu} />
            ))}
        </div>
      </div>
    </div>
  );
}
