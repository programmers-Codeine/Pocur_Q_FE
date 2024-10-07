import clsx from 'clsx';
import { ItemButtonProps } from './Button.types';

export default function ItemButton({ title, state, onContextMenu, onClick }: ItemButtonProps) {
  return (
    <div
      className={clsx(
        'flex h-[36px] cursor-pointer items-center rounded-lg border px-4 py-2',
        state === 'normal' ? 'text-d2 00 border-d200' : 'border-b300 text-b300'
      )}
      onContextMenu={onContextMenu}
      onClick={onClick}
    >
      <p>{title}</p>
    </div>
  );
}
