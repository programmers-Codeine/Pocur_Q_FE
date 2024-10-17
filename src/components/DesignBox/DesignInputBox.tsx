import Input from '../common/Input/Input';
import DesignColorButton from '../common/Button/DesignColorButton';
import Button from '../common/Button/Button';
import useColorPaletteStore from '@/stores/useColorPaletteStore';
import useDesignStore from '@/stores/useDesignStore';
import { MouseEvent, ChangeEvent, useEffect } from 'react';
import { NoImage, Reset } from '@/assets/icons';
import { DesignInputBoxProps } from './DesignBox.types';
import { setDesignImage, getCurrentDesign } from '@/apis/setting/design.api';

export default function DesignInputBox({
  inputDesignForm,
  onSetInputDesignForm,
  onSetCurrentDesignForm,
  onReset,
  onNavigate,
  onSaveDesign,
  onAddDesignImage,
}: DesignInputBoxProps) {
  const { openPalette } = useColorPaletteStore();
  const { currentDesignId } = useDesignStore();

  useEffect(() => {
    if (currentDesignId === '0') return;
    getCurrentDesign(currentDesignId).then(designPresets => {
      onSetCurrentDesignForm(designPresets);
    });
  }, []);

  const handleOpenColorPalette = (e: MouseEvent<HTMLDivElement>, color: string) => {
    const { clientX: x, clientY: y } = e;
    const { id, textContent } = e.currentTarget;

    const paletteHeight = 400;
    const adjustedY =
      y + paletteHeight > window.innerHeight ? window.innerHeight - paletteHeight : y;

    openPalette(x, adjustedY, color, id, textContent as string);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;

    setDesignImage(file).then(res => {
      onAddDesignImage(res.data.imageUrl);
    });
  };

  return (
    <div className="flex h-full w-[50%] flex-col justify-between gap-4">
      <div className="flex h-full flex-col gap-4 overflow-scroll">
        <div>
          <Input
            id="designName"
            type="text"
            placeholder="디자인 이름을 적어주세요."
            value={inputDesignForm.designName}
            handleInputChange={onSetInputDesignForm}
            label="디자인 이름"
          />
        </div>
        <div>
          <label className="text-em font-semibold">디자인 이미지 설정</label>

          <label className="relative my-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 hover:bg-d30">
            <input
              id="designImageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <div className="relative flex h-[120px] w-full items-center justify-center">
              {inputDesignForm.designImage ? (
                <img
                  src={inputDesignForm.designImage}
                  alt="Menu Preview"
                  className="absolute left-0 top-0 h-full w-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <NoImage width="64" height="64" className="z-10 stroke-d900" />
                  <p className="text-d200">이미지 업로드</p>
                </div>
              )}
            </div>
          </label>
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
              onClick={handleOpenColorPalette}
            />
            <DesignColorButton
              id="all-largeText"
              title="큰 텍스트"
              color={inputDesignForm.theme.all.largeText}
              onClick={handleOpenColorPalette}
            />
            <DesignColorButton
              id="all-smallText"
              title="작은 텍스트"
              color={inputDesignForm.theme.all.smallText}
              onClick={handleOpenColorPalette}
            />
            <DesignColorButton
              id="all-box"
              title="박스"
              color={inputDesignForm.theme.all.box}
              onClick={handleOpenColorPalette}
            />
            <DesignColorButton
              id="all-boxOutline"
              title="박스 테두리"
              color={inputDesignForm.theme.all.boxOutline}
              onClick={handleOpenColorPalette}
            />
            <DesignColorButton
              id="all-icon"
              title="아이콘"
              color={inputDesignForm.theme.all.icon}
              onClick={handleOpenColorPalette}
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
                onClick={handleOpenColorPalette}
              />
              <DesignColorButton
                id="button-normal-textAndIcon"
                title="텍스트/아이콘"
                color={inputDesignForm.theme.button.normal.textAndIcon}
                onClick={handleOpenColorPalette}
              />
              <DesignColorButton
                id="button-normal-outline"
                title="테두리"
                color={inputDesignForm.theme.button.normal.outline}
                onClick={handleOpenColorPalette}
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
                onClick={handleOpenColorPalette}
              />
              <DesignColorButton
                id="button-active-textAndIcon"
                title="텍스트/아이콘"
                color={inputDesignForm.theme.button.active.textAndIcon}
                onClick={handleOpenColorPalette}
              />
              <DesignColorButton
                id="button-active-outline"
                title="테두리"
                color={inputDesignForm.theme.button.active.outline}
                onClick={handleOpenColorPalette}
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
              onClick={handleOpenColorPalette}
            />
            <DesignColorButton
              id="addOption-label-new"
              title="라벨[NEW]"
              color={inputDesignForm.theme.addOption.label.new}
              onClick={handleOpenColorPalette}
            />
            <DesignColorButton
              id="addOption-label-soldOut"
              title="라벨[품절]"
              color={inputDesignForm.theme.addOption.label.soldOut}
              onClick={handleOpenColorPalette}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-8 px-4">
        <Button title="뒤로가기" type="warn" size="small" onClick={() => onNavigate(1)} />
        {currentDesignId === '0' ? (
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
  );
}
