import Input from '../common/Input/Input';
import ItemButton from '../common/Button/ItemButton';
import useMenuStore from '@/stores/useMenuStore';
import { Plus } from '@/assets/icons';
import { CategoryBoxProps } from './MenuBox.types';

export default function CategoryBox({
  message,
  category,
  onCategory,
  onSetInputMenuForm,
  onOpenCategoryOptions,
}: CategoryBoxProps) {
  const { categories, menus } = useMenuStore();

  const isCategoryActive = (categoryId: string) => {
    return menus.some(menu => menu.category === categoryId);
  };

  return (
    <div className="flex h-fit min-w-[620px] flex-col gap-4 rounded-lg border border-d50 px-3 py-4">
      <div className="flex min-h-[54px] items-center justify-between gap-3 px-3">
        <div className="relative w-full font-bold">
          <p className="text-2xl">카테고리 추가하기</p>
          <p className="absolute text-base text-highlightRed">{message}</p>
        </div>

        <div className="min-w-[180px]">
          <Input
            id="category"
            type="text"
            placeholder="카테고리 이름"
            value={category}
            handleInputChange={onSetInputMenuForm}
            onClickIcon={() => onCategory(1)}
          >
            <Plus width="16" height="16" className="fill-d900" />
          </Input>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 px-3">
        {categories.map(({ id, title }) => (
          <ItemButton
            key={id}
            title={title}
            state={isCategoryActive(id) ? 'active' : 'normal'}
            onContextMenu={e => onOpenCategoryOptions(e, id)}
          />
        ))}
      </div>
    </div>
  );
}
