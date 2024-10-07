import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { TabProps } from './Tab.types';

export default function Tab({
  id,
  leftPosition,
  currentTab,
  handleTabChange,
  children,
}: PropsWithChildren<TabProps>) {
  return (
    <div
      key={id}
      className={clsx(
        'absolute top-0 flex h-[50px] min-w-[160px] items-center justify-center rounded-tr-[30px] border border-d900 text-2xl font-semibold',
        leftPosition,
        id === 'table' && 'z-[1]',
        id === currentTab ? 'bg-d900 text-d10' : 'cursor-pointer bg-d10 text-d900 hover:bg-b50'
      )}
      onClick={() => handleTabChange(id)}
    >
      {children}
    </div>
  );
}
