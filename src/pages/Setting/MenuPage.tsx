import { ChangeEvent, MouseEvent, useState } from 'react';
import useContextMenuStore from '@/stores/useContextMenuStore';
import ContextOptions from '@/components/common/Options/ContextOptions';
import useMenuStore from '@/stores/useMenuStore';
import {
  AddOptionsBox,
  CategoryBox,
  FastToolBox,
  MainMenuBox,
  ManageMenuBox,
} from '@/components/MenuBox';
import { DEFAULT_OPTIONS } from '@/constants/options';
import { InputMenuFormTypes } from '@/types';

export default function MenuPage() {
  const { openMenu, isVisible, parentId } = useContextMenuStore();
  const {
    menus,
    currentId,
    step,
    addCategory,
    deleteCategory,
    setCurrentId,
    setStep,
    saveMenu,
    deleteMenu,
  } = useMenuStore();

  const [inputMenuForm, setInputMenuForm] = useState<InputMenuFormTypes>({
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
      <div className="flex h-[180px] w-full gap-3">
        <CategoryBox
          category={inputMenuForm.category}
          handleCategory={handleCategory}
          handleSetInputMenuForm={handleSetInputMenuForm}
          handleOpenCategoryOptions={handleOpenCategoryOptions}
        />
        <FastToolBox />
      </div>
      <div className="flex w-full gap-3">
        <MainMenuBox
          search={inputMenuForm.search}
          handleAddMenu={handleAddMenu}
          handleSetInputMenuForm={handleSetInputMenuForm}
          handleSearchMenu={handleSearchMenu}
          handleToggleMenu={handleToggleMenu}
          handleSetMenu={handleSetMenu}
          handleDeleteMenu={handleDeleteMenu}
        />
        <div className="flex w-full gap-3">
          {step !== 1 && (
            <ManageMenuBox
              inputMenuForm={inputMenuForm}
              handleSetInputMenuForm={handleSetInputMenuForm}
              handleSaveMenu={handleSaveMenu}
              handleSelectCategory={handleSelectCategory}
              handleAddMenuImage={handleAddMenuImage}
              handleEditOptions={handleEditOptions}
              handleDeleteMenu={handleDeleteMenu}
            />
          )}
          {step === 3 ? (
            <AddOptionsBox
              optionsInput={inputMenuForm.optionsInput}
              handleSaveOptions={handleSaveOptions}
              handleSetInputOption={handleSetInputOption}
              handleDeleteOptions={handleDeleteOptions}
              handleAddOptions={handleAddOptions}
            />
          ) : (
            <div className="w-[50%]"></div>
          )}
        </div>
      </div>
      {isVisible && <ContextOptions options={DEFAULT_OPTIONS} onClick={handleCategory} />}
    </div>
  );
}
