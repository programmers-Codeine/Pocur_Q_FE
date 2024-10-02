import clsx from 'clsx';
import { ItemButtonProps } from './Button.types';

export default function ItemButton({ title, state, onContextMenu }: ItemButtonProps) {
  return (
    <div
      className={clsx(
        'flex h-[36px] cursor-pointer items-center rounded-lg border px-4 py-2',
        state === 'normal' ? 'border-d200 text-d200' : 'border-b300 text-b300'
      )}
      onContextMenu={onContextMenu}
    >
      <p>{title}</p>
    </div>
  );
}
