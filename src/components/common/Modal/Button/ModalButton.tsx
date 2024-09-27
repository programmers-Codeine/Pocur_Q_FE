import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { ModalButtonProps } from './ModalButton.types';

export default function ModalButton({
  onClick,
  children,
  type = 'default',
}: PropsWithChildren<ModalButtonProps>) {
  return (
    <button
      className={clsx(
        'min-w-[170px] max-w-[200px] flex-1 rounded-lg border border-d200 bg-d30 px-[12px] py-[8px] text-base font-bold',
        type !== 'default' ? 'text-highlightRed' : 'text-b500'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
