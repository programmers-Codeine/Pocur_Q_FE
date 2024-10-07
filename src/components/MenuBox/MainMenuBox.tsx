import clsx from 'clsx';
import useMenuStore from '@/stores/useMenuStore';
import Input from '../common/Input/Input';
import {
  Plus,
  Search,
  NoImage,
  ToggleOn,
  ToggleOff,
  Trash,
  Modify,
  PencilQuestion,
} from '@/assets/icons';
import { MainMenuBoxProps } from './MenuBox.types';

export default function MainMenuBox({
  search,
  onAddMenu,
  onSetInputMenuForm,
  onSearchMenu,
  onToggleMenu,
  onSetMenu,
  onDeleteMenu,
}: MainMenuBoxProps) {
  
  const { categories, menus, selectedMenu } = useMenuStore();
  
  return (
    <div className="flex h-fit min-w-[620px] flex-col gap-3 rounded-lg border border-d50 px-3 py-4">
      <div className="mx-3 flex min-h-[54px] items-center justify-between gap-3 border-b border-d50 pb-3">
        <p className="text-2xl font-bold">메뉴 추가하기</p>
        <Plus width="24" onClick={onAddMenu} className="cursor-pointer" />
      </div>
      <div className="mx-3 border-b border-d50 pb-3">
        <Input
          id="search"
          type="text"
          placeholder="메뉴 이름 검색"
          value={search}
          handleInputChange={onSetInputMenuForm}
          onClickIcon={onSearchMenu}
        >
          <Search width="16" height="16" className="stroke-d50" />
        </Input>
      </div>
      {menus.length !== 0 ? (
        <div className="flex flex-col gap-4 px-4 pt-1">
          {menus.map((menu, idx) => {
            const categoryTitle =
              categories.find(category => category.id === menu.category)?.title || '';

            const addOptionsText =
              menu.addOptions
                ?.map(addOption => `${addOption.optionName}, ${addOption.price}`)
                .join(', ') || '';

            const fullText = `${categoryTitle}/${menu.price}/${menu.origin}/${addOptionsText}`;
            const displayText = fullText.length > 42 ? `${fullText.slice(0, 42)}...` : fullText;

            return (
              <div
                key={menu.id}
                className={clsx(
                  'flex gap-3 hover:bg-d30',
                  idx !== menus.length - 1 && 'border-b border-d50 pb-4'
                )}
              >
                {menu.image ? <img /> : <NoImage width="48" height="48" />}
                <div className="flex w-full flex-col">
                  <div className="flex w-full justify-between">
                    <span className="text-xl">{menu.title}</span>
                    <div className="flex gap-2">
                      {selectedMenu.includes(menu.id) ? (
                        <ToggleOn
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => onToggleMenu(menu.id)}
                        />
                      ) : (
                        <ToggleOff
                          width="20"
                          height="20"
                          className="cursor-pointer"
                          onClick={() => onToggleMenu(menu.id)}
                        />
                      )}
                      <Modify
                        width="20"
                        height="20"
                        className="cursor-pointer"
                        onClick={() => onSetMenu(menu.id)}
                      />
                      <Trash
                        width="20"
                        height="20"
                        className="cursor-pointer"
                        onClick={() => onDeleteMenu(menu.id)}
                      />
                    </div>
                  </div>
                  <span className="text-d200">{displayText}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 font-semibold text-d200">
          <span>추가한 음식이 없어요.</span>
          <PencilQuestion width="32" height="32" />
        </div>
      )}
    </div>
  );
}
