import { Label, NoImage } from '@/assets/icons';
import clsx from 'clsx';
import { useState } from 'react';
import { MenuCardProps } from './MenuCard.types';
import { labels } from '@/stores/labelData';

export default function MenuCard({ menu }: MenuCardProps) {
  const [selectLabel, setSelectLabel] = useState(Array(4).fill(false));

  const handleSelectLabel = (idx: number) => {
    setSelectLabel(prev => [
      ...prev.map((isSelect, i) => {
        return idx === i ? !isSelect : false;
      }),
    ]);
  };

  return (
    <div className="relative flex flex-col items-center gap-2 pr-7">
      {!menu.image && <NoImage className="relative z-[2]" width={100} height={100} />}
      <div>{menu.title}</div>
      <div className="absolute right-4 top-0 z-[1]">
        {labels.map(({ color }, i) => (
          <div
            className={clsx(selectLabel[i] ? 'translate-x-4' : 'hover:translate-x-4')}
            onClick={() => handleSelectLabel(i)}
          >
            <Label
              className={clsx(color, selectLabel[i] ? '' : 'opacity-50 hover:opacity-100')}
              width={62}
              height={20}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
