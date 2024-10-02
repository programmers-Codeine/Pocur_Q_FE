import Input from '../common/Input/Input';
import ItemButton from '../common/Button/ItemButton';
import useMenuStore from '@/stores/useMenuStore';
import { Plus } from '@/assets/icons';
import { CategoryBoxProps } from './MenuBox.types';

export default function CategoryBox({
  category,
  handleCategory,
  handleSetInputMenuForm,
  handleOpenCategoryOptions,
}: CategoryBoxProps) {
  const { categories } = useMenuStore();

  return (
    <div className="flex h-fit min-w-[620px] flex-col gap-3 rounded-lg border border-d50 px-3 py-4">
      <div className="flex min-h-[54px] items-center justify-between gap-3 px-3">
        <p className="text-2xl font-bold">카테고리 추가하기</p>
        <div>
          <Input
            id="category"
            type="text"
            placeholder="카테고리 이름"
            value={category}
            handleInputChange={handleSetInputMenuForm}
            onClickIcon={() => handleCategory(1)}
          >
            <Plus width="16" height="16" />
          </Input>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 px-3">
        {categories.map(({ id, title }) => (
          <ItemButton
            key={id}
            title={title}
            state="normal"
            onContextMenu={e => handleOpenCategoryOptions(e, id)}
          />
        ))}
      </div>
    </div>
  );
}
