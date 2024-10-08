import useContextMenuStore from '@/stores/useContextMenuStore';
import ContextOptions from '@/components/common/Options/ContextOptions';
import useDesignStore from '@/stores/useDesignStore';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { InputDesignFormTypes } from '@/types';
import useColorPaletteStore from '@/stores/useColorPaletteStore';
import { DesignHomeBox, DesignInputBox, DesignPreviewBox } from '@/components/DesignBox';
import ColorPalettePicker from '@/components/ColorPalettePicker/ColorPalettePicker';
import { DESIGN_BOX_OPTIONS } from '@/constants/options';

export default function DesignPage() {
  const [inputDesignForm, setInputDesignForm] = useState<InputDesignFormTypes>({
    designName: '',
    designImage: '',
    theme: {
      all: {
        background: '#ffffff',
        largeText: '#ffffff',
        smallText: '#ffffff',
        box: '#ffffff',
        boxOutline: '#ffffff',
        icon: '#ffffff',
      },
      button: {
        normal: {
          background: '#ffffff',
          textAndIcon: '#ffffff',
          outline: '#ffffff',
        },
        active: {
          background: '#ffffff',
          textAndIcon: '#ffffff',
          outline: '#ffffff',
        },
      },
      addOption: {
        label: {
          hot: '#ffffff',
          new: '#ffffff',
          soldOut: '#ffffff',
        },
      },
    },
  });

  const { openMenu, isVisible, parentId } = useContextMenuStore();
  const { isPaletteVisible, currentId } = useColorPaletteStore();
  const {
    designInfos,
    currentDesignId,
    setSelect,
    navigation,
    navigate,
    deleteDesign,
    addDesign,
    updateDesign,
  } = useDesignStore();

  const handleSetInputDesignForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputDesignForm(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOpenDesignOptions = (e: MouseEvent, id: number) => {
    const { clientX: x, clientY: y } = e;
    openMenu(id, x, y);
  };

  const handleDesignCards = (id: number) => {
    if (id === 1) {
      setSelect(parentId);
    } else if (id === 2) {
      const foundDesignInfo = designInfos.find(designInfo => designInfo.id === parentId);
      if (foundDesignInfo) {
        navigate(2, 'update', foundDesignInfo.id);
        setInputDesignForm(foundDesignInfo.form);
      }
    } else if (id === 3) {
      if (parentId === 1) {
        //TODO: default Design can't delete.
        // 혹은, 아예 parentId가 1인경우에는 보여주지 않는 걸로.
      } else {
        deleteDesign(parentId);
      }
    }
  };

  const handleNavigate = (page: number) => {
    if (page === 1) {
      // TODO: 저장되지 않는다 모달 생성 후 기본폼으로 상태 변경
      handleReset('all');
      navigate(page, 'home');
    } else {
      navigate(page);
    }
  };

  const handleSaveDesign = (use: 'create' | 'update') => {
    // TODO: 디자인 이름 설정했는지 체크
    if (inputDesignForm.designName === '') return;
    if (use === 'create') addDesign(inputDesignForm);
    else if (use === 'update') updateDesign(inputDesignForm, currentDesignId);
    handleNavigate(1);
  };

  const handleChangeColor = (color: string) => {
    const keys = currentId.split('-');
    const newDesignForm = { ...inputDesignForm };

    let currentLevel: any = newDesignForm.theme;

    for (let i = 0; i < keys.length - 1; i++) {
      if (currentLevel[keys[i] as keyof typeof currentLevel]) {
        currentLevel = currentLevel[keys[i] as keyof typeof currentLevel];
      }
    }

    currentLevel[keys[keys.length - 1] as keyof typeof currentLevel] = color;

    setInputDesignForm(newDesignForm);
  };

  const handleReset = (reset: 'all' | 'color') => {
    const defaultTheme = {
      all: {
        background: '#ffffff',
        largeText: '#ffffff',
        smallText: '#ffffff',
        box: '#ffffff',
        boxOutline: '#ffffff',
        icon: '#ffffff',
      },
      button: {
        normal: {
          background: '#ffffff',
          textAndIcon: '#ffffff',
          outline: '#ffffff',
        },
        active: {
          background: '#ffffff',
          textAndIcon: '#ffffff',
          outline: '#ffffff',
        },
      },
      addOption: {
        label: {
          hot: '#ffffff',
          new: '#ffffff',
          soldOut: '#ffffff',
        },
      },
    };
    setInputDesignForm(prev => ({
      ...prev,
      theme: defaultTheme,
      ...(reset === 'all' && { designName: '', designImage: '' }),
    }));
  };

  return (
    <>
      {navigation === 1 && (
        <DesignHomeBox onOpenDesignOptions={handleOpenDesignOptions} onNavigate={handleNavigate} />
      )}

      {navigation >= 2 && (
        <div className="flex h-full">
          <DesignInputBox
            inputDesignForm={inputDesignForm}
            onSetInputDesignForm={handleSetInputDesignForm}
            onReset={handleReset}
            onNavigate={handleNavigate}
            onSaveDesign={handleSaveDesign}
          />
          <DesignPreviewBox onNavigate={handleNavigate} />
          {isPaletteVisible && <ColorPalettePicker changeColor={handleChangeColor} />}
        </div>
      )}
      {isVisible && <ContextOptions options={DESIGN_BOX_OPTIONS} onClick={handleDesignCards} />}
    </>
  );
}
