import { Label, NoImage } from '@/assets/icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { MenuCardProps } from './MenuCard.types';
import { labels } from '@/stores/labelData';

export default function MenuCard({ menu, onSelectLabel }: MenuCardProps) {
  const [selectLabel, setSelectLabel] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSelectLabel = (id: string) => {
    if (id === 'isActive') {
      setIsActive(prev => !prev);
      onSelectLabel(menu, '', !isActive);
    } else {
      setSelectLabel(prev => (prev === id ? '' : id));
      onSelectLabel(menu, selectLabel === id ? '' : id, isActive);
    }
  };
  const handleInit = () => {
    if (menu.hot) {
      setSelectLabel('hot');
    } else if (menu.new) {
      setSelectLabel('new');
    } else if (menu.soldOut) {
      setSelectLabel('soldOut');
    }

    if (menu.isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  useEffect(() => {
    handleInit();
  }, []);

  return (
    <div className="relative flex flex-col items-center gap-2 pr-7">
      {menu.image !== '' ? (
        <img className="relative z-[2] h-24 w-24" src={menu.image} />
      ) : (
        <NoImage
          className="relative z-[2] rounded-lg bg-d10 stroke-d900"
          width={100}
          height={100}
        />
      )}
      <div>{menu.title}</div>
      <div className="absolute right-4 top-0 z-[1]">
        {labels.map(({ id, color }) => {
          if (id === 'isActive') {
            return (
              <div
                key={id}
                className={clsx(isActive ? 'translate-x-4' : 'hover:translate-x-4')}
                onClick={() => handleSelectLabel(id)}
              >
                <Label
                  className={clsx(color, isActive ? '' : 'opacity-50')}
                  width={62}
                  height={20}
                />
              </div>
            );
          }
          return (
            <div
              key={id}
              className={clsx(selectLabel === id ? 'translate-x-4' : 'hover:translate-x-4')}
              onClick={() => handleSelectLabel(id)}
            >
              <Label
                className={clsx(color, selectLabel === id ? '' : 'opacity-50')}
                width={62}
                height={20}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
