import { DesignThemeTypes } from '@/types';
import clsx from 'clsx';
import { PropsWithChildren, MouseEvent } from 'react';

interface IconButtonProps {
  title: string;
  theme?: DesignThemeTypes;
  sizeVariant?: 'normal' | 'small'; // 텍스트 및 아이콘 사이즈 조절
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function IconButton({
  children,
  title,
  theme,
  sizeVariant = 'normal',
  onClick,
}: PropsWithChildren<IconButtonProps>) {
  return (
    <button
      className={clsx(
        'flex items-center rounded-lg bg-b300 text-d10',
        sizeVariant === 'normal' && 'gap-2 p-3 text-base font-semibold',
        sizeVariant === 'small' && 'gap-1 p-2 text-xs font-medium'
      )}
      style={{
        borderColor: theme?.button.active.outline,
        backgroundColor: theme?.button.active.background,
        color: theme?.button.active.textAndIcon
      }}
      onClick={onClick}
    >
      {title}
      <div
        className={clsx(
          'flex items-center justify-center',
          sizeVariant === 'normal' && 'h-6 w-6',
          sizeVariant === 'small' && 'h-4 w-4'
        )}
      >
        {children}
      </div>
    </button>
  );
}
