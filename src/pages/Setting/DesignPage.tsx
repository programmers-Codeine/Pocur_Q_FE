import clsx from 'clsx';
import DesignCard from '@/components/common/Card/DesignCard';
import useContextMenuStore from '@/stores/useContextMenuStore';
import ContextOptions from '@/components/common/Options/ContextOptions';
import useDesignStore from '@/stores/useDesignStore';
import { ChangeEvent, MouseEvent, useState } from 'react';
import Input from '@/components/common/Input/Input';
import { InputDesignFormTypes } from '@/types';
import Button from '@/components/common/Button/Button';
import { NoImage, Reset } from '@/assets/icons';
import DesignColorButton from '@/components/common/Button/DesignColorButton';
import useColorPaletteStore from '@/stores/useColorPaletteStore';
import ColorPalettePicker from '@/components/ColorPalettePicker/ColorPalettePicker';

const DEFAULT_OPTIONS = [
  { id: 1, name: '적용하기' },
  { id: 2, name: '수정하기' },
  { id: 3, name: '삭제하기' },
];

const NAVIGATION_DESIGN = [
  { id: 2, name: '소개/로딩/결제' },
  { id: 3, name: '메뉴판' },
  { id: 4, name: '메뉴상세' },
  { id: 5, name: '장바구니 및 결제' },
];

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
  const { isPaletteVisible, openPalette, currentId } = useColorPaletteStore();
  const {
    designs,
    designInfos,
    currentDesignId,
    selected,
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
      onReset('all');
      navigate(page, 'home');
    } else {
      navigate(page);
    }
  };

  const onSaveDesign = (use: 'create' | 'update') => {
    // TODO: 디자인 이름 설정했는지 체크
    if (inputDesignForm.designName === '') return;
    if (use === 'create') addDesign(inputDesignForm);
    else if (use === 'update') updateDesign(inputDesignForm, currentDesignId);
    handleNavigate(1);
  };

  const onOpenColorPalette = (e: MouseEvent, color: string) => {
    const { clientX: x, clientY: y } = e;
    const { id, textContent } = e.currentTarget;

    const paletteHeight = 400;
    const adjustedY =
      y + paletteHeight > window.innerHeight ? window.innerHeight - paletteHeight : y;

    openPalette(x, adjustedY, color, id, textContent as string);
  };

  const onChangeColor = (color: string) => {
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

  const onReset = (reset: 'all' | 'color') => {
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
        <div className="flex h-full w-auto flex-wrap content-start gap-4 overflow-scroll">
          {designs.map(({ id, title, edit }) => (
            <DesignCard
              key={id}
              title={title}
              edit={id === selected ? '적용 중' : edit}
              state={id === selected ? 'active' : 'normal'}
              onContextMenu={e => handleOpenDesignOptions(e, id)}
            />
          ))}
          <DesignCard state="none" onClick={() => handleNavigate(2)} />
        </div>
      )}

      {navigation >= 2 && (
        <div className="flex h-full">
          <div className="flex h-full w-[50%] flex-col justify-between gap-4">
            <div className="flex h-full flex-col gap-4 overflow-scroll">
              <div>
                <Input
                  id="designName"
                  type="text"
                  placeholder="디자인 이름을 적어주세요."
                  value={inputDesignForm.designName}
                  handleInputChange={handleSetInputDesignForm}
                  label="디자인 이름"
                />
              </div>
              <div>
                <label className="text-em font-semibold">디자인 이미지 설정</label>
                <div className="my-2 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-4">
                  <NoImage />
                  <p className="text-d200">이미지 업로드</p>
                </div>
              </div>
              <div className="flex items-center justify-between pr-4">
                <p className="text-xl font-semibold">테마 설정</p>
                <Reset
                  width="24"
                  height="24"
                  className="cursor-pointer"
                  onClick={() => onReset('color')}
                />
              </div>
              <div className="flex items-center gap-3 border-b-2 border-d50 px-2 pb-4 pt-2">
                <div className="min-w-[100px]">
                  <p className="text-lg font-bold">전체</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <DesignColorButton
                    id="all-background"
                    title="배경"
                    color={inputDesignForm.theme.all.background}
                    onClick={onOpenColorPalette}
                  />
                  <DesignColorButton
                    id="all-largeText"
                    title="큰 텍스트"
                    color={inputDesignForm.theme.all.largeText}
                    onClick={onOpenColorPalette}
                  />
                  <DesignColorButton
                    id="all-smallText"
                    title="작은 텍스트"
                    color={inputDesignForm.theme.all.smallText}
                    onClick={onOpenColorPalette}
                  />
                  <DesignColorButton
                    id="all-box"
                    title="박스"
                    color={inputDesignForm.theme.all.box}
                    onClick={onOpenColorPalette}
                  />
                  <DesignColorButton
                    id="all-boxOutline"
                    title="박스 테두리"
                    color={inputDesignForm.theme.all.boxOutline}
                    onClick={onOpenColorPalette}
                  />
                  <DesignColorButton
                    id="all-icon"
                    title="아이콘"
                    color={inputDesignForm.theme.all.icon}
                    onClick={onOpenColorPalette}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 border-b-2 border-d50 px-2 pb-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="min-w-[100px]">
                    <p className="text-lg font-bold">버튼</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <DesignColorButton
                      id="button-normal-background"
                      title="배경"
                      color={inputDesignForm.theme.button.normal.background}
                      onClick={onOpenColorPalette}
                    />
                    <DesignColorButton
                      id="button-normal-textAndIcon"
                      title="텍스트/아이콘"
                      color={inputDesignForm.theme.button.normal.textAndIcon}
                      onClick={onOpenColorPalette}
                    />
                    <DesignColorButton
                      id="button-normal-outline"
                      title="테두리"
                      color={inputDesignForm.theme.button.normal.outline}
                      onClick={onOpenColorPalette}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="min-w-[100px]">
                    <p className="text-lg font-bold">버튼 활성화</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <DesignColorButton
                      id="button-active-background"
                      title="배경"
                      color={inputDesignForm.theme.button.active.background}
                      onClick={onOpenColorPalette}
                    />
                    <DesignColorButton
                      id="button-active-textAndIcon"
                      title="텍스트/아이콘"
                      color={inputDesignForm.theme.button.active.textAndIcon}
                      onClick={onOpenColorPalette}
                    />
                    <DesignColorButton
                      id="button-active-outline"
                      title="테두리"
                      color={inputDesignForm.theme.button.active.outline}
                      onClick={onOpenColorPalette}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-b-2 border-d50 px-2 pb-4 pt-2">
                <div className="min-w-[100px]">
                  <p className="text-lg font-bold">추가 옵션</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <DesignColorButton
                    id="addOption-label-hot"
                    title="라벨[HOT]"
                    color={inputDesignForm.theme.addOption.label.hot}
                    onClick={onOpenColorPalette}
                  />
                  <DesignColorButton
                    id="addOption-label-new"
                    title="라벨[NEW]"
                    color={inputDesignForm.theme.addOption.label.new}
                    onClick={onOpenColorPalette}
                  />
                  <DesignColorButton
                    id="addOption-label-soldOut"
                    title="라벨[품절]"
                    color={inputDesignForm.theme.addOption.label.soldOut}
                    onClick={onOpenColorPalette}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-8 px-4">
              <Button title="뒤로가기" type="warn" size="small" onClick={() => handleNavigate(1)} />
              {currentDesignId === 0 ? (
                <Button
                  title="생성하기"
                  type="others"
                  size="small"
                  onClick={() => onSaveDesign('create')}
                />
              ) : (
                <Button
                  title="저장하기"
                  type="others"
                  size="small"
                  onClick={() => onSaveDesign('update')}
                />
              )}
            </div>
          </div>
          <div className="flex h-full w-[50%] flex-col items-center gap-1">
            <div className="flex min-h-[36px] gap-2">
              {NAVIGATION_DESIGN.map(({ id, name }) => (
                <div
                  className={clsx(
                    'h-fit cursor-pointer px-2 py-1',
                    id === navigation
                      ? 'rounded-lg bg-b300 font-semibold text-d10'
                      : 'hover:border-b-4'
                  )}
                  key={id}
                  onClick={() => handleNavigate(id)}
                >
                  <p>{name}</p>
                </div>
              ))}
            </div>
            <div className="bg-deviceFrame relative aspect-[412/912] w-[50%] bg-contain bg-center bg-no-repeat">
              <div className="absolute inset-0 px-[2%] py-[15%]">
                {/* TODO: navigation에 따른 디자인적 요소 보여주기 */}
                {navigation === 2 && <div>소개/로딩/결제</div>}
                {navigation === 3 && <div>메뉴판</div>}
                {navigation === 4 && <div>메뉴상세</div>}
                {navigation === 5 && <div>장바구니 및 결제</div>}
              </div>
            </div>
          </div>
          {isPaletteVisible && <ColorPalettePicker changeColor={onChangeColor} />}
        </div>
      )}
      {isVisible && <ContextOptions options={DEFAULT_OPTIONS} onClick={handleDesignCards} />}
    </>
  );
}
