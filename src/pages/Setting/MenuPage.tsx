import clsx from 'clsx';
import { ChangeEvent, MouseEvent, useState } from 'react';
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
import { easyFastToolData } from '@/stores/menuData';
import ItemButton from '@/components/common/Button/ItemButton';
import useContextMenuStore from '@/stores/useContextMenuStore';
import ContextOptions from '@/components/common/Options/ContextOptions';
import useMenuStore from '@/stores/useMenuStore';

const DEFAULT_OPTIONS = [{ id: 3, name: '삭제하기' }];

type inputMenuFormTypes = {
  category: string;
  search: string;
  menuName: string;
  description: string;
  menuCategory: number;
  price: string;
  origin: string;
  options: { id: number; optionName: string; price: string }[] | null;
  optionsInput: { id: number; optionName: string; price: string }[];
};

export default function MenuPage() {
  const { openMenu, isVisible, parentId } = useContextMenuStore();
  const {
    categories,
    menus,
    toggleMenu,
    currentId,
    step,
    addCategory,
    deleteCategory,
    setCurrentId,
    setStep,
    saveMenu,
    deleteMenu,
  } = useMenuStore();
  const [inputMenuForm, setInputMenuForm] = useState<inputMenuFormTypes>({
    category: '',
    search: '',
    menuName: '',
    description: '',
    menuCategory: 1,
    price: '',
    origin: '',
    options: null,
    optionsInput: [{ id: 1, optionName: '', price: '' }],
  });

  const handleSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setInputMenuForm(prev => ({
      ...prev,
      menuCategory: Number(e.target.value),
    }));
  };

  const handleSetInputOption = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const [field, optionId] = id.split('-');

    setInputMenuForm(prevForm => ({
      ...prevForm,
      optionsInput: prevForm.optionsInput
        ? prevForm.optionsInput.map(optionInput =>
            optionInput.id === Number(optionId) ? { ...optionInput, [field]: value } : optionInput
          )
        : [],
    }));
  };

  const handleSetInputMenuForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputMenuForm(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCategory = (id: number) => {
    // TODO: 매직넘버 상수화 필요
    if (id === 1) {
      addCategory(inputMenuForm.category);
      setInputMenuForm(prev => ({
        ...prev,
        category: '',
      }));
    } else if (id === 3) {
      // TODO: 카테고리가 1개 이하일때 경고
      deleteCategory(parentId);
    }
  };

  const handleOpenCategoryOptions = (e: MouseEvent, id: number) => {
    const { clientX: x, clientY: y } = e;
    openMenu(id, x, y);
  };

  const handleAddMenu = () => {
    setStep(2);
  };
  const handleSearchMenu = () => {};
  const handleDeleteMenu = (menuId?: number) => {
    if (menuId) deleteMenu(menuId);
    setInputMenuForm({
      category: '',
      search: '',
      menuName: '',
      description: '',
      menuCategory: 1,
      price: '',
      origin: '',
      options: null,
      optionsInput: [{ id: 1, optionName: '', price: '' }],
    });

    setStep(1);
  };

  const handleToggleMenu = (menuId: number) => {};
  const handleSetMenu = (menuId: number) => {
    const menu = menus.find(menu => menu.id === menuId);
    if (menu) {
      const addOptions = menu.addOptions
        ? menu.addOptions.map(option => ({
            id: option.id,
            optionName: option.optionName,
            price: option.price.toString(),
          }))
        : null;

      const addOptionsInput = addOptions ? addOptions : [{ id: 1, optionName: '', price: '' }];

      setInputMenuForm(prev => ({
        ...prev,
        menuName: menu.title,
        description: menu.description,
        menuCategory: menu.category,
        price: menu.price.toString(),
        origin: menu.origin,
        options: addOptions,
        optionsInput: addOptionsInput,
      }));
      setStep(2);
      setCurrentId(menuId);
    }
  };

  const handleSaveMenu = () => {
    const { menuCategory, menuName, description, price, origin, options } = inputMenuForm;
    if (menuCategory && menuName && description && price && origin) {
      const addOptions = options?.map(({ optionName, price }, idx) => ({
        id: idx + 1,
        optionName,
        price: Number(price),
      }));

      const menuData = {
        id: currentId === 0 ? Math.max(...menus.map(menu => menu.id)) + 1 : currentId,
        title: menuName,
        description,
        category: Number(menuCategory),
        price: Number(price),
        origin,
        addOptions: addOptions?.length ? addOptions : null,
      };
      saveMenu(menuData);
      setInputMenuForm({
        category: '',
        search: '',
        menuName: '',
        description: '',
        menuCategory: 1,
        price: '',
        origin: '',
        options: null,
        optionsInput: [{ id: 1, optionName: '', price: '' }],
      });
      setStep(1);
    }
  };
  const handleAddMenuImage = () => {};

  const handleEditOptions = () => {
    setStep(3);
  };

  const handleAddOptions = () => {
    // TODO: 최대갯수 제한 (ex:10)
    setInputMenuForm(prev => {
      const newId = prev.optionsInput.length
        ? prev.optionsInput[prev.optionsInput.length - 1].id + 1
        : 1;
      return {
        ...prev,
        optionsInput: [...(prev.optionsInput || []), { id: newId, optionName: '', price: '' }],
      };
    });
  };

  const handleDeleteOptions = (optionId: number) => {
    // TODO: api 연결
    setInputMenuForm(prev => ({
      ...prev,
      optionsInput: prev.optionsInput.filter(optionInput => optionInput.id !== optionId) || [], // id가 다른 옵션들만 남기기
    }));
  };

  const handleSaveOptions = () => {
    // TODO: api 연결
    // TODO: 옵션이름, 가격이 들어가있지 않은 경우
    setInputMenuForm(prev => ({
      ...prev,
      options: prev.optionsInput,
    }));
    setStep(2);
  };

  return (
    <div className="flex flex-col gap-4">
      {isVisible && <ContextOptions options={DEFAULT_OPTIONS} onClick={handleCategory} />}
      <div className="flex h-[180px] w-full gap-3">
        <div className="flex h-fit min-w-[620px] flex-col gap-3 rounded-lg border border-d50 px-3 py-4">
          <div className="flex min-h-[54px] items-center justify-between gap-3 px-3">
            <p className="text-2xl font-bold">카테고리 추가하기</p>
            <div>
              <Input
                id="category"
                type="text"
                placeholder="카테고리 이름"
                value={inputMenuForm.category}
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
        <div className="flex h-fit w-full flex-col gap-3 rounded-lg border border-d50 px-3 py-4">
          <div className="flex min-h-[54px] items-center gap-1 px-3 text-2xl font-bold">
            <span>빠르고 쉬운 도구</span>
            <span className="text-b500">Beta</span>
          </div>
          <div className="flex flex-wrap gap-3 px-3">
            {easyFastToolData.map(({ id, title }) => (
              <ItemButton key={id} title={title} state="normal" />
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
              id="search"
              type="text"
              placeholder="메뉴 이름 검색"
              value={inputMenuForm.search}
              handleInputChange={handleSetInputMenuForm}
              onClickIcon={handleSearchMenu}
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
                          {toggleMenu.includes(menu.id) ? (
                            <ToggleOn
                              width="20"
                              height="20"
                              className="cursor-pointer"
                              onClick={() => handleToggleMenu(menu.id)}
                            />
                          ) : (
                            <ToggleOff
                              width="20"
                              height="20"
                              className="cursor-pointer"
                              onClick={() => handleToggleMenu(menu.id)}
                            />
                          )}
                          <Modify
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => handleSetMenu(menu.id)}
                          />
                          <Trash
                            width="20"
                            height="20"
                            className="cursor-pointer"
                            onClick={() => handleDeleteMenu(menu.id)}
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
        <div className="flex w-full gap-3">
          {step !== 1 && (
            <div className="flex h-fit w-[50%] flex-col rounded-lg border border-d50 px-2 py-4">
              <div className="mx-3 flex items-center justify-between gap-3 border-b border-d50 pb-3">
                <input
                  id="menuName"
                  type="text"
                  value={inputMenuForm.menuName}
                  className="bg-d10 text-xl placeholder:text-d200"
                  placeholder="메뉴 이름"
                  onChange={handleSetInputMenuForm}
                />
                <Save width="20" height="20" onClick={handleSaveMenu} className="cursor-pointer" />
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
                    onChange={handleSetInputMenuForm}
                  />
                </div>
                <div className="my-3 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">카테고리</span>
                    <Exclamation width="16" height="16" />
                  </div>
                  <div className="flex w-full items-center">
                    <select
                      className="w-full rounded border bg-d10 p-2"
                      onChange={handleSelectCategory}
                    >
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
                    onChange={handleSetInputMenuForm}
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
                    onChange={handleSetInputMenuForm}
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
                    onClick={handleAddMenuImage}
                  />
                </div>
                <div className="my-3 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-lg">[추가 옵션]</span>
                    <Edit
                      className="cursor-pointer"
                      width="18"
                      height="18"
                      onClick={handleEditOptions}
                    />
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
                  onClick={() => handleDeleteMenu()}
                  className="rotate-45 cursor-pointer"
                />
              </div>
            </div>
          )}
          {step === 3 ? (
            <div className="flex h-fit w-[50%] flex-col rounded-lg border border-d50 px-2 py-4">
              <div className="mx-3 flex items-center justify-between gap-3 border-b border-d50 pb-3">
                <span className="bg-d10 text-xl font-bold">추가 옵션 관리</span>
                <Save
                  width="20"
                  height="20"
                  onClick={handleSaveOptions}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-col py-2">
                {inputMenuForm.optionsInput.map(({ id, optionName, price }) => (
                  <div key={id} className="flex items-center gap-2 pl-4 pr-2">
                    <div className="w-[60%]">
                      <Input
                        id={`optionName-${id}`}
                        type="text"
                        placeholder="옵션 이름"
                        value={optionName}
                        handleInputChange={handleSetInputOption}
                      />
                    </div>
                    <div className="w-[30%]">
                      <Input
                        id={`price-${id}`}
                        type="text"
                        placeholder="가격"
                        value={price}
                        handleInputChange={handleSetInputOption}
                      />
                    </div>
                    <Trash
                      className="cursor-pointer"
                      width="20"
                      height="20"
                      onClick={() => handleDeleteOptions(id)}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-3">
                <Plus
                  width="24"
                  height="24"
                  onClick={handleAddOptions}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div className="w-[50%]"></div>
          )}
        </div>
      </div>
    </div>
  );
}
