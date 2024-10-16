import useContextMenuStore from '@/stores/useContextMenuStore';
import ContextOptions from '@/components/common/Options/ContextOptions';
import useDesignStore from '@/stores/useDesignStore';
import { ChangeEvent, MouseEvent, useState, useEffect } from 'react';
import { InputDesignFormTypes, SetDesignData } from '@/types';
import useColorPaletteStore from '@/stores/useColorPaletteStore';
import { DesignHomeBox, DesignInputBox, DesignPreviewBox } from '@/components/DesignBox';
import ColorPalettePicker from '@/components/ColorPalettePicker/ColorPalettePicker';
import { DESIGN_BOX_OPTIONS } from '@/constants/options';
import {
  getAllDesignPreset,
  getCurrentDesignPreset,
  addDesignPreset,
  replaceCurrentDesignPreset,
  deleteDesignPreset,
  updateDesignPreset,
} from '@/apis/setting/design.api';

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
    designs,
    currentDesignId,
    navigation,
    setSelect,
    navigate,
    setDesign,
    deleteDesign,
    addDesign,
    updateDesign,
  } = useDesignStore();

  useEffect(() => {
    getAllDesignPreset().then(designPresets => {
      setDesign(designPresets);
    });

    getCurrentDesignPreset().then(id => {
      setSelect(id);
    });
  }, []);

  const handleSetCurrentDesignForm = (designPresets: SetDesignData) => {
    setInputDesignForm({
      designName: designPresets.name || '',
      designImage: designPresets.designImage || '',
      theme: {
        all: {
          background: designPresets.background || '#ffffff',
          largeText: designPresets.bigText || '#ffffff',
          smallText: designPresets.smallText || '#ffffff',
          box: designPresets.box || '#ffffff',
          boxOutline: designPresets.boxBorder || '#ffffff',
          icon: designPresets.icon || '#ffffff',
        },
        button: {
          normal: {
            background: designPresets.buttonBackground || '#ffffff',
            textAndIcon: designPresets.buttonText || '#ffffff',
            outline: designPresets.buttonBorder || '#ffffff',
          },
          active: {
            background: designPresets.buttonActiveBackground || '#ffffff',
            textAndIcon: designPresets.buttonActiveText || '#ffffff',
            outline: designPresets.buttonActiveBorder || '#ffffff',
          },
        },
        addOption: {
          label: {
            hot: designPresets.labelHot || '#ffffff',
            new: designPresets.labelNew || '#ffffff',
            soldOut: designPresets.labelSoldOut || '#ffffff',
          },
        },
      },
    });
  };

  const handleSetInputDesignForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputDesignForm(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleOpenDesignOptions = (e: MouseEvent, id: string) => {
    const { clientX: x, clientY: y } = e;
    openMenu(id, x, y);
  };

  const handleDesignCards = (id: number) => {
    if (id === 1) {
      replaceCurrentDesignPreset(parentId).then(() => setSelect(parentId));
    } else if (id === 2) {
      const foundDesign = designs.find(design => design.id === parentId);
      if (foundDesign) {
        navigate(2, 'update', foundDesign.id);
      }
    } else if (id === 3) {
      if (parentId === '1') {
        //TODO: default Design can't delete.
        // 혹은, 아예 parentId가 1인경우에는 보여주지 않는 걸로.
      } else {
        deleteDesignPreset(parentId).then(() => deleteDesign(parentId));
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
    const { designName, designImage, theme } = inputDesignForm;
    if (use === 'create')
      addDesignPreset({
        name: designName,
        designImage: designImage,
        background: theme.all.background,
        bigText: theme.all.largeText,
        smallText: theme.all.smallText,
        box: theme.all.box,
        boxBorder: theme.all.boxOutline,
        icon: theme.all.icon,
        buttonBackground: theme.button.normal.background,
        buttonText: theme.button.normal.textAndIcon,
        buttonBorder: theme.button.normal.outline,
        buttonActiveBackground: theme.button.active.background,
        buttonActiveText: theme.button.active.textAndIcon,
        buttonActiveBorder: theme.button.active.outline,
        labelHot: theme.addOption.label.hot,
        labelNew: theme.addOption.label.new,
        labelSoldOut: theme.addOption.label.soldOut,
      }).then(({ id, name }) => {
        addDesign({ id: id, title: name, image: designImage });
      });
    else if (use === 'update')
      updateDesignPreset(
        {
          name: designName,
          designImage: designImage,
          background: theme.all.background,
          bigText: theme.all.largeText,
          smallText: theme.all.smallText,
          box: theme.all.box,
          boxBorder: theme.all.boxOutline,
          icon: theme.all.icon,
          buttonBackground: theme.button.normal.background,
          buttonText: theme.button.normal.textAndIcon,
          buttonBorder: theme.button.normal.outline,
          buttonActiveBackground: theme.button.active.background,
          buttonActiveText: theme.button.active.textAndIcon,
          buttonActiveBorder: theme.button.active.outline,
          labelHot: theme.addOption.label.hot,
          labelNew: theme.addOption.label.new,
          labelSoldOut: theme.addOption.label.soldOut,
        },
        currentDesignId
      ).then(({ id, name }) =>
        updateDesign({ id: id, title: name, image: designImage }, currentDesignId)
      );

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

  const handleAddDesignImage = (imageUrl: string) => {
    setInputDesignForm(prev => ({
      ...prev,
      designImage: imageUrl,
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
            onSetCurrentDesignForm={handleSetCurrentDesignForm}
            onReset={handleReset}
            onNavigate={handleNavigate}
            onSaveDesign={handleSaveDesign}
            onAddDesignImage={handleAddDesignImage}
          />
          <DesignPreviewBox onNavigate={handleNavigate} theme={inputDesignForm.theme} />
          {isPaletteVisible && <ColorPalettePicker changeColor={handleChangeColor} />}
        </div>
      )}
      {isVisible && <ContextOptions options={DESIGN_BOX_OPTIONS} onClick={handleDesignCards} />}
    </>
  );
}
