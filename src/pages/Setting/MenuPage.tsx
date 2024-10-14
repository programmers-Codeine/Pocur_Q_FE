import { ChangeEvent, MouseEvent, useState, useEffect } from 'react';
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
import { MENU_CATEGORY_OPTIONS } from '@/constants/options';
import { InputMenuFormTypes, SetOptionsData } from '@/types';
import {
  addCategories,
  addMenu,
  deleteCategories,
  getCategories,
  getMenu,
  deleteMenu,
  applyMenu,
  addMenuOptionsForm,
} from '@/apis/setting/menu.api';
import { v4 as uuidv4 } from 'uuid';

export default function MenuPage() {
  const { openMenu, isVisible, parentId } = useContextMenuStore();
  const {
    menus,
    currentId,
    step,
    categories,
    selectedMenu,
    setCategories,
    addCategory,
    deleteCategory,
    setCurrentId,
    setSelectedMenu,
    setStep,
    setMenu,
    saveMenu,
    cancelMenu,
    toggleMenu,
    toggleTool,
  } = useMenuStore();

  const [inputMenuForm, setInputMenuForm] = useState<InputMenuFormTypes>({
    category: '',
    search: '',
    menuName: '',
    description: '',
    menuCategory: '',
    price: '',
    origin: '',
    options: null,
    image: '',
    optionsInput: [{ id: '1', optionName: '', price: '' }], // id를 string으로 변환
  });

  const [warnMessage, setWarnMessage] = useState({
    type: '',
    message: '',
  });

  useEffect(() => {
    getCategories().then(categories => {
      setCategories(categories);
      setInputMenuForm(prev => ({ ...prev, menuCategory: categories[0].id }));
    });

    getMenu().then(menuData => {
      const activeMenuIds = menuData.filter(menu => menu.isActive).map(menu => menu.id);
      setSelectedMenu(activeMenuIds);
      setMenu(menuData);
    });
  }, []);

  useEffect(() => {
    if (warnMessage.type) {
      const messageTimer = setTimeout(() => {
        setWarnMessage({ type: '', message: '' });
      }, 3000);
      return () => clearTimeout(messageTimer);
    }
  }, [warnMessage]);

  const handleSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setInputMenuForm(prev => ({
      ...prev,
      menuCategory: e.target.value,
    }));
  };

  const handleSetInputOption = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const [field, optionId] = id.split('_');

    setInputMenuForm(prevForm => ({
      ...prevForm,
      optionsInput: prevForm.optionsInput
        ? prevForm.optionsInput.map(optionInput =>
            optionInput.id === optionId ? { ...optionInput, [field]: value } : optionInput
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
    if (id === 1) {
      if (!inputMenuForm.category)
        return setWarnMessage(() => ({
          type: 'category',
          message: '카테고리 이름을 입력하지 않았어요.',
        }));
      if (categories.length >= 10)
        return setWarnMessage(() => ({
          type: 'category',
          message: '더이상 카테고리를 생성할 수 없어요.',
        }));
      if (categories.find(category => category.title === inputMenuForm.category))
        return setWarnMessage(() => ({
          type: 'category',
          message: '동일한 카테고리 이름을 가지고 있어요.',
        }));

      addCategories(inputMenuForm.category).then(id => {
        addCategory(id, inputMenuForm.category);
        setInputMenuForm(prev => ({
          ...prev,
          category: '',
        }));
      });
    } else if (id === 3) {
      if (categories.length <= 1)
        return setWarnMessage(() => ({
          type: 'category',
          message: '더이상 카테고리를 삭제할 수 없어요.',
        }));
      const isActiveCategory = menus.some(menu => menu.category === parentId);
      if (isActiveCategory) {
        // TODO:경고모달
      } else {
        deleteCategories(parentId).then(() => deleteCategory(parentId));
      }
    }
  };

  const handleOpenCategoryOptions = (e: MouseEvent, id: string) => {
    const { clientX: x, clientY: y } = e;
    openMenu(id, x, y);
  };

  const handleAddMenu = () => {
    setStep(2);
  };
  const handleSearchMenu = () => {};
  const handleCancelMenu = (menuId?: string) => {
    if (menuId) {
      cancelMenu(menuId);
      deleteMenu(menuId);
    }
    setInputMenuForm({
      category: '',
      search: '',
      menuName: '',
      description: '',
      menuCategory: categories[0].id,
      price: '',
      origin: '',
      image: '',
      options: null,
      optionsInput: [{ id: '1', optionName: '', price: '' }],
    });

    setStep(1);
  };

  const handleSetMenu = (menuId: string) => {
    const menu = menus.find(menu => menu.id === menuId);
    if (menu) {
      const addOptions = menu.addOptions
        ? menu.addOptions.map(option => ({
            id: option.id,
            optionName: option.optionName,
            price: option.price.toString(),
          }))
        : null;

      const addOptionsInput = addOptions ? addOptions : [{ id: '1', optionName: '', price: '' }];

      setInputMenuForm(prev => ({
        ...prev,
        menuName: menu.title,
        description: menu.description,
        menuCategory: menu.category,
        price: menu.price.toString(),
        origin: menu.origin,
        options: addOptions,
        image: menu.image || '',
        optionsInput: addOptionsInput,
      }));
      setStep(2);
      setCurrentId(menuId);
    }
  };

  const handleSaveMenu = () => {
    const { menuCategory, menuName, description, price, origin, options, image } = inputMenuForm;
    if (menuCategory && menuName && description && price && origin) {
      const addOptions = options?.map(({ optionName, price }, idx) => ({
        id: String(idx + 1),
        optionName,
        price: Number(price),
      }));

      const menuData = {
        id: currentId,
        title: menuName,
        description,
        category: menuCategory,
        price: Number(price),
        origin,
        image,
        addOptions: addOptions?.length ? addOptions : null,
      };

      if (currentId) {
        // 옵션 적용해서 생성 혹은 변경
        applyMenu(
          {
            categoryId: menuCategory,
            menuName: menuName,
            price: Number(price),
            menuDetail: description,
            menuImg: image,
            origin: origin,
          },
          currentId
        ).then(() => saveMenu(menuData));
      } else {
        // 옵션 없이 생성
        addMenu({
          categoryId: menuCategory,
          menuName: menuName,
          price: Number(price),
          menuDetail: description,
          menuImg: image,
          origin: origin,
        }).then(id => {
          const menuData = {
            id: id,
            title: menuName,
            description,
            category: menuCategory,
            price: Number(price),
            origin,
            image,
            addOptions: addOptions?.length ? addOptions : null,
          };
          saveMenu(menuData);
        });
      }

      setInputMenuForm({
        category: '',
        search: '',
        menuName: '',
        description: '',
        menuCategory: categories[0].id,
        price: '',
        origin: '',
        image: '',
        options: null,
        optionsInput: [{ id: '1', optionName: '', price: '' }],
      });
      setStep(1);
    } else
      setWarnMessage(prev => ({
        ...prev,
        type: 'menu',
      }));
  };

  const handleAddMenuImage = (imageUrl: string) => {
    setInputMenuForm(prev => ({
      ...prev,
      image: imageUrl,
    }));
  };

  const handleEditOptions = () => {
    const { menuCategory, menuName, description, price, origin, image } = inputMenuForm;

    if (menuCategory && menuName && description && price && origin) {
      if (!currentId)
        // 임시 세이브
        addMenu({
          categoryId: menuCategory,
          menuName: menuName,
          price: Number(price),
          menuDetail: description,
          menuImg: image,
          origin: origin,
        }).then(id => setCurrentId(id));
      setInputMenuForm(prev => ({
        ...prev,
        optionsInput: prev.options || [{ id: uuidv4(), optionName: '', price: '' }],
      }));
      setStep(3);
    } else {
      setWarnMessage(prev => ({
        ...prev,
        type: 'menu',
      }));
    }
  };

  const handleAddOptions = () => {
    setInputMenuForm(prev => {
      return {
        ...prev,
        optionsInput: [...(prev.optionsInput || []), { id: uuidv4(), optionName: '', price: '' }],
      };
    });
  };

  const handleDeleteOptions = (optionId: string) => {
    setInputMenuForm(prev => ({
      ...prev,
      optionsInput: prev.optionsInput.filter(optionInput => optionInput.id !== optionId) || [], // id가 다른 옵션들만 남기기 (string 비교)
    }));
  };

  const handleSaveOptions = () => {
    const validOptions = inputMenuForm.optionsInput
      .filter(optionInput => optionInput.optionName && optionInput.price) // Ensure both fields are present
      .map(optionInput => ({
        optionName: optionInput.optionName,
        optionPrice: Number(optionInput.price),
      }));

    addMenuOptionsForm(validOptions, currentId).then(options => {
      const newOptions = options.map((option: SetOptionsData) => ({
        id: option.id,
        optionName: option.optionName,
        price: option.optionPrice,
      }));
      setInputMenuForm(prev => ({
        ...prev,
        options: newOptions,
        optionsInput: [{ id: '1', optionName: '', price: '' }],
      }));
    });
    setStep(2);
  };

  const handleToggleMenu = (menuId: string) => {
    const currentMenu = menus.find(menu => menu.id === menuId);

    if (!currentMenu) return;

    // console.log({
    //   categoryId: currentMenu.category,
    //   menuName: currentMenu.title,
    //   price: currentMenu.price,
    //   menuDetail: currentMenu.description,
    //   menuImg: currentMenu.image || '',
    //   origin: currentMenu.origin,
    //   isActive: !selectedMenu.includes(menuId),
    // });
    // TODO: TOGGLE 기능 필요
    applyMenu(
      {
        categoryId: currentMenu.category,
        menuName: currentMenu.title,
        price: currentMenu.price,
        menuDetail: currentMenu.description,
        menuImg: currentMenu.image || '',
        origin: currentMenu.origin,
        isActive: !selectedMenu.includes(menuId),
      },
      menuId
    ).then(() => toggleMenu(menuId));
  };
  const handleToggleTool = (toolId: string) => {
    toggleTool(toolId);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-[180px] w-full gap-3">
        <CategoryBox
          message={warnMessage.type === 'category' ? warnMessage.message : ''}
          category={inputMenuForm.category}
          onCategory={handleCategory}
          onSetInputMenuForm={handleSetInputMenuForm}
          onOpenCategoryOptions={handleOpenCategoryOptions}
        />
        <FastToolBox onToggleTool={handleToggleTool} />
      </div>
      <div className="flex w-full gap-3">
        <MainMenuBox
          search={inputMenuForm.search}
          onAddMenu={handleAddMenu}
          onSetInputMenuForm={handleSetInputMenuForm}
          onSearchMenu={handleSearchMenu}
          onToggleMenu={handleToggleMenu}
          onSetMenu={handleSetMenu}
          onCancelMenu={handleCancelMenu}
        />
        <div className="flex w-full gap-3">
          {step !== 1 && (
            <ManageMenuBox
              warn={warnMessage.type === 'menu'}
              inputMenuForm={inputMenuForm}
              onSetInputMenuForm={handleSetInputMenuForm}
              onSaveMenu={handleSaveMenu}
              onSelectCategory={handleSelectCategory}
              onAddMenuImage={handleAddMenuImage}
              onEditOptions={handleEditOptions}
              onCancelMenu={handleCancelMenu}
            />
          )}
          {step === 3 ? (
            <AddOptionsBox
              optionsInput={inputMenuForm.optionsInput}
              onSaveOptions={handleSaveOptions}
              onSetInputOption={handleSetInputOption}
              onDeleteOptions={handleDeleteOptions}
              onAddOptions={handleAddOptions}
            />
          ) : (
            <div className="w-[50%]"></div>
          )}
        </div>
      </div>
      {isVisible && <ContextOptions options={MENU_CATEGORY_OPTIONS} onClick={handleCategory} />}
    </div>
  );
}
