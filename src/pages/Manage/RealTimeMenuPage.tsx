import { Search } from '@/assets/icons';
import Input from '@/components/common/Input/Input';
import useMenuStore from '@/stores/useMenuStore';
import { ChangeEvent, useState } from 'react';
import MenuCard from './RealTimeMenu/MenuCard';
import LabelCard from './RealTimeMenu/LabelCard';
import { labels } from '@/stores/labelData';

export default function RealTimeMenuPage() {
  const [search, setSearch] = useState('');
  const { menus } = useMenuStore();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleMenuSearch = () => {
    // TODO 검색 로직 구현
  };

  return (
    <div className="relative flex h-full flex-col gap-5 p-10">
      <div className="flex w-full flex-col items-center rounded-lg border border-d50">
        <div className="py-3 text-2xl font-bold">라벨</div>
        <div className="flex gap-4 py-4">
          {labels.map(({ title, color }) => (
            <LabelCard title={title} labelColor={color} />
          ))}
        </div>
      </div>
      <div className="w-full rounded-lg border border-d50 p-4">
        <div className="text-2xl font-semibold">메뉴 목록</div>
        <div className="my-4 border-y border-d50 py-4">
          <Input
            id="search"
            type="text"
            placeholder="메뉴이름 혹은 카테고리 검색"
            value={search}
            handleInputChange={handleInputChange}
            onClickIcon={handleMenuSearch}
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
