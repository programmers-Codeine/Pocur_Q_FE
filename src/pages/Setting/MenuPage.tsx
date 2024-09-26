import { MouseEvent } from 'react';
import Input from '@/components/common/Input/Input';
import {
  Plus,
  Search,
  Exclamation,
  Save,
  PencilQuestion,
  NoImage,
  Edit,
  Trash,
  ToggleOn,
  ToggleOff,
  Modify,
} from '@/assets/icons';
import { categoryData, easyFastToolData } from '@/stores/menuData';
import ItemButton from '@/components/common/Button/ItemButton';
import useContextMenuStore from '@/stores/useContextMenuStore';
import ContextOptions from '@/components/common/Options/ContextOptions';

const IS_EXIST_MENU = true;
const DEFAULT_OPTIONS = [
  { id: 1, name: '적용하기' },
  { id: 2, name: '수정하기' },
  { id: 3, name: '삭제하기' },
];

export default function MenuPage() {
  const { openMenu, isVisible } = useContextMenuStore();
  const handleAddCategory = () => {};
  const handleOpenCategoryOptions = (e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    openMenu(x, y);
  };
  const handleDeleteCategory = () => {};

  const handleAddMenu = () => {};
  const handleSearchMenu = () => {};
  const handleDeleteMenu = () => {};

  const handleToggleMenu = () => {};
  const handleModifyMenu = () => {};

  const handleSaveMenu = () => {};
  const handleAddMenuImage = () => {};
  const handleEditOptions = () => {};

  const handleAddOptions = () => {};
  const handleDeleteOptions = () => {};
  const handleSaveOptions = () => {};

  return (
    <div className="flex flex-col gap-4">
      {isVisible && <ContextOptions options={DEFAULT_OPTIONS} onClick={handleDeleteCategory} />}
      <div className="flex h-[180px] w-full gap-3">
        <div className="flex h-fit min-w-[620px] flex-col gap-3 rounded-lg border border-d50 px-3 py-4">
          <div className="flex min-h-[54px] items-center justify-between gap-3 px-3">
            <p className="text-2xl font-bold">카테고리 추가하기</p>
            <div>
              <Input
                id="category"
                type="text"
                placeholder="카테고리 이름"
                value=""
                handleInputChange={handleAddCategory}
              >
                <Plus width="16" height="16" />
              </Input>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 px-3">
            {categoryData.map(item => (
              <ItemButton
                key={item.id}
                title={item.title}
                state="normal"
                onContextMenu={handleOpenCategoryOptions}
              />
            ))}
          </div>
        </div>
        <div className="flex h-fit w-full flex-col gap-3 rounded-lg border border-d50 px-3 py-4">
          <div className="flex min-h-[54px] items-center gap-1 px-3 text-2xl font-bold">
            <span>빠르고 쉬운 도구</span>
            <span className="text-b500">Beta</span>
          </div>
          <div className="flex flex-wrap gap-3 px-3">
            {easyFastToolData.map(item => (
              <ItemButton key={item.id} title={item.title} state="normal" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full gap-3">
        <div className="flex h-fit min-w-[620px] flex-col gap-3 rounded-lg border border-d50 px-3 py-4">
          <div className="mx-3 flex min-h-[54px] items-center justify-between gap-3 border-b border-d50 pb-3">
            <p className="text-2xl font-bold">메뉴 추가하기</p>
            <Plus width="24" onClick={handleAddMenu} className="cursor-pointer" />
          </div>
          <div className="mx-3 border-b border-d50 pb-3">
            <Input
              id="category"
              type="text"
              placeholder="카테고리 이름"
              value=""
              handleInputChange={handleSearchMenu}
            >
              <Search width="16" height="16" className="stroke-d50" />
            </Input>
          </div>
          {IS_EXIST_MENU ? (
            <div className="flex flex-col gap-4 px-4 pt-1">
              <div className="flex gap-3 border-b border-d50 pb-4">
                <NoImage width="48" height="48" />
                <div className="flex w-full flex-col">
                  <div className="flex w-full justify-between">
                    <span className="text-xl">짜장면</span>
                    <div className="flex gap-2">
                      <ToggleOn
                        width="20"
                        height="20"
                        className="cursor-pointer"
                        onClick={handleToggleMenu}
                      />
                      <Modify
                        width="20"
                        height="20"
                        className="cursor-pointer"
                        onClick={handleModifyMenu}
                      />
                      <Trash
                        width="20"
                        height="20"
                        className="cursor-pointer"
                        onClick={handleDeleteMenu}
                      />
                    </div>
                  </div>
                  <span className="text-d200">
                    메인메뉴/6000/돼지고기: 국내산/저렴한 가격, 기본메뉴/추가 옵션 곱빼기 +...
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <NoImage width="48" height="48" />
                <div className="flex w-full flex-col">
                  <div className="flex w-full justify-between">
                    <span className="text-xl">짜장면</span>
                    <div className="flex gap-2">
                      <ToggleOff
                        width="20"
                        height="20"
                        className="cursor-pointer"
                        onClick={handleToggleMenu}
                      />
                      <Modify
                        width="20"
                        height="20"
                        className="cursor-pointer"
                        onClick={handleModifyMenu}
                      />
                      <Trash
                        width="20"
                        height="20"
                        className="cursor-pointer"
                        onClick={handleDeleteMenu}
                      />
                    </div>
                  </div>
                  <span className="text-d200">
                    메인메뉴/6000/돼지고기: 국내산/저렴한 가격, 기본메뉴/추가 옵션 곱빼기 +...
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 font-semibold text-d200">
              <span>추가한 음식이 없어요.</span>
              <PencilQuestion width="32" height="32" />
            </div>
          )}
        </div>
        <div className="flex w-full gap-3">
          <div className="flex h-fit w-[50%] flex-col rounded-lg border border-d50 px-2 py-4">
            <div className="mx-3 flex items-center justify-between gap-3 border-b border-d50 pb-3">
              <input className="bg-d10 text-xl placeholder:text-d200" placeholder="메뉴 이름" />
              <Save width="20" height="20" onClick={handleSaveMenu} className="cursor-pointer" />
            </div>
            <div className="mx-3 flex flex-col border-b border-d50">
              <div className="my-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-lg">메뉴 설명</span>
                  <Exclamation width="16" height="16" />
                </div>
                <input
                  className="bg-d10 placeholder:text-d200"
                  placeholder="메뉴 설명을 적어주세요."
                />
              </div>
              <div className="my-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-lg">카테고리</span>
                  <Exclamation width="16" height="16" />
                </div>
                <input
                  className="bg-d10 placeholder:text-d200"
                  placeholder="메뉴 설명을 적어주세요."
                />
              </div>
              <div className="my-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-lg">가격</span>
                  <Exclamation width="16" height="16" />
                </div>
                <input className="bg-d10 placeholder:text-d200" placeholder="가격을 적어주세요." />
              </div>
              <div className="my-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-lg">원산지 표기</span>
                  <Exclamation width="16" height="16" />
                </div>
                <input
                  className="bg-d10 placeholder:text-d200"
                  placeholder="ex) 배추: 국내산, 고춧가루: 국내산"
                />
              </div>
              <div className="my-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-lg">메뉴 사진 추가</span>
                  <span className="text-d200">사용하지 않음</span>
                </div>
                <NoImage
                  className="cursor-pointer"
                  width="48"
                  height="48"
                  onClick={handleEditOptions}
                />
              </div>
              <div className="my-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-lg">[추가 옵션]</span>
                  <Edit
                    className="cursor-pointer"
                    width="18"
                    height="18"
                    onClick={handleAddMenuImage}
                  />
                </div>
                <div>
                  <span className="text-d200">사용하지 않음</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <p className="text-xl">삭제하기</p>
              <Plus
                width="24"
                height="24"
                onClick={handleDeleteMenu}
                className="rotate-45 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex h-fit w-[50%] flex-col rounded-lg border border-d50 px-2 py-4">
            <div className="mx-3 flex items-center justify-between gap-3 border-b border-d50 pb-3">
              <span className="bg-d10 text-xl font-bold">추가 옵션 관리</span>
              <Save width="20" height="20" onClick={handleSaveOptions} className="cursor-pointer" />
            </div>
            <div className="flex flex-col py-2">
              <div className="flex items-center gap-2 pl-4 pr-2">
                <div className="w-[60%]">
                  <Input
                    id="optionName"
                    type="text"
                    placeholder="옵션 이름"
                    value=""
                    handleInputChange={handleAddCategory}
                  />
                </div>
                <div className="w-[30%]">
                  <Input
                    id="optionPrice"
                    type="text"
                    placeholder="가격"
                    value=""
                    handleInputChange={handleAddCategory}
                  />
                </div>
                <Trash width="20" height="20" onClick={handleDeleteOptions} />
              </div>
              <div className="flex items-center gap-2 pl-4 pr-2">
                <div className="w-[60%]">
                  <Input
                    id="optionName"
                    type="text"
                    placeholder="옵션 이름"
                    value=""
                    handleInputChange={handleAddCategory}
                  />
                </div>
                <div className="w-[30%]">
                  <Input
                    id="optionPrice"
                    type="text"
                    placeholder="가격"
                    value=""
                    handleInputChange={handleAddCategory}
                  />
                </div>
                <Trash width="20" height="20" onClick={handleDeleteOptions} />
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Plus width="24" height="24" onClick={handleAddOptions} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
