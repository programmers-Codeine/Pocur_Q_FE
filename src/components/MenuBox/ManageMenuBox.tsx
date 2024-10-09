import useMenuStore from '@/stores/useMenuStore';
import { Save, Exclamation, NoImage, Edit, Plus } from '@/assets/icons';
import { ManageMenuBoxProps } from './MenuBox.types';

export default function ManageMenuBox({
  inputMenuForm,
  onSetInputMenuForm,
  onSaveMenu,
  onSelectCategory,
  onAddMenuImage,
  onEditOptions,
  onDeleteMenu,
}: ManageMenuBoxProps) {
  const { categories } = useMenuStore();
  return (
    <div className="flex h-fit w-[50%] flex-col rounded-lg border border-d50 px-2 py-4">
      <div className="mx-3 flex items-center justify-between border-b border-d50 pb-3">
        <input
          id="menuName"
          type="text"
          value={inputMenuForm.menuName}
          className="bg-d10 text-xl placeholder:text-d200"
          size={10}
          placeholder="메뉴 이름"
          onChange={onSetInputMenuForm}
        />
        <Save width="20" height="20" onClick={onSaveMenu} className="cursor-pointer" />
      </div>
      <div className="mx-3 flex flex-col border-b border-d50">
        <div className="my-3 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-lg">메뉴 설명</span>
            <Exclamation width="16" height="16" />
          </div>
          <input
            id="description"
            type="text"
            value={inputMenuForm.description}
            className="bg-d10 placeholder:text-d200"
            placeholder="메뉴 설명을 적어주세요."
            onChange={onSetInputMenuForm}
          />
        </div>
        <div className="my-3 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-lg">카테고리</span>
            <Exclamation width="16" height="16" />
          </div>
          <div className="flex w-full items-center">
            <select className="w-full rounded border bg-d10 p-2" onChange={onSelectCategory}>
              {categories.map(({ id, title }) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="my-3 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-lg">가격</span>
            <Exclamation width="16" height="16" />
          </div>
          <input
            id="price"
            type="text"
            value={inputMenuForm.price}
            className="bg-d10 placeholder:text-d200"
            placeholder="가격을 적어주세요."
            onChange={onSetInputMenuForm}
          />
        </div>
        <div className="my-3 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-lg">원산지 표기</span>
            <Exclamation width="16" height="16" />
          </div>
          <input
            id="origin"
            type="text"
            value={inputMenuForm.origin}
            className="bg-d10 placeholder:text-d200"
            placeholder="ex) 배추: 국내산, 고춧가루: 국내산"
            onChange={onSetInputMenuForm}
          />
        </div>
        <div className="my-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg">메뉴 사진 추가</span>
            <span className="text-d200">사용하지 않음</span>
          </div>
          <NoImage className="cursor-pointer" width="48" height="48" onClick={onAddMenuImage} />
        </div>
        <div className="my-3 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-lg">[추가 옵션]</span>
            <Edit className="cursor-pointer" width="18" height="18" onClick={onEditOptions} />
          </div>
          <div className="mt-1">
            {inputMenuForm.options ? (
              inputMenuForm.options.map(({ id, optionName, price }) => (
                <div key={id} className="flex justify-between">
                  <span>{optionName}</span>
                  <span>+{price}</span>
                </div>
              ))
            ) : (
              <span className="text-d200">사용하지 않음</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 pt-2">
        <p className="text-xl">삭제하기</p>
        <Plus
          width="24"
          height="24"
          onClick={() => onDeleteMenu()}
          className="rotate-45 cursor-pointer"
        />
      </div>
    </div>
  );
}
