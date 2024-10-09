import clsx from 'clsx';
import { ColorPicker, useColor, IColor } from 'react-color-palette';
import 'react-color-palette/css';
import useColorPaletteStore from '@/stores/useColorPaletteStore';
import { Check, Plus } from '@/assets/icons';
import { ColorPalettePickerProps } from './ColorPalettePicker.types';

export default function ColorPalettePicker({ changeColor }: ColorPalettePickerProps) {
  const { isPaletteVisible, position, initColor, currentTitle, closePalette } =
    useColorPaletteStore();
  const [color, setColor] = useColor(initColor);

  const handleColor = (color: IColor) => {
    setColor(color);
  };

  const handleClick = (isSave: boolean) => {
    if (isSave) changeColor(color.hex);
    closePalette();
  };

  if (!isPaletteVisible) return null;

  return (
    <div
      className={clsx('absolute rounded-lg border bg-d10 p-4 shadow-lg')}
      style={{ top: position.y, left: position.x }}
    >
      <div className="relative w-full">
        <div className="absolute -top-14 flex w-full items-center justify-between rounded-full bg-d10 shadow-lg">
          <div
            onClick={() => handleClick(false)}
            className="z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-highlightRed"
          >
            <Plus width="24" height="24" className="rotate-45 fill-d10" />
          </div>
          <p className="font-semibold">{currentTitle}</p>
          <div
            onClick={() => handleClick(true)}
            className="z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border bg-b200"
          >
            <Check width="24" height="24" className="fill-d10" />
          </div>
        </div>
        <ColorPicker hideInput={['rgb', 'hsv']} color={color} onChange={handleColor} />
      </div>
    </div>
  );
}
