import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface Props {
  id: string;
  index: number;
  currentTab: string;
  handleTabChange: (id: string) => void;
}

export default function Tab({
  id,
  index,
  currentTab,
  handleTabChange,
  children,
}: PropsWithChildren<Props>) {
  const leftPosition = `left-[${130 * index}px]`; // 고정된 160px에 대한 값

  return (
    <div
      key={id}
      className={clsx(
        'absolute top-0 flex h-[50px] min-w-[160px] items-center justify-center rounded-tr-[30px] border border-d900 text-2xl font-semibold',
        leftPosition,
        index === 0 && 'z-[1]',
        id === currentTab ? 'bg-d900 text-d10' : 'cursor-pointer bg-d10 text-d900 hover:bg-b50'
      )}
      onClick={() => handleTabChange(id)}
    >
      {children}
    </div>
  );
}
