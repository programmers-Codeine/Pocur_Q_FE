import { PropsWithChildren, useEffect } from 'react';
import { WarnModalProps } from './Modal.types';
import { Info } from '@/assets/icons';
import { createPortal } from 'react-dom';

export default function WarnModalContainer({
  open,
  onClose,
  autoClose = 0,
  children,
}: PropsWithChildren<WarnModalProps>) {
  const modalElement = document.getElementById('modal');

  useEffect(() => {
    if (open && autoClose && onClose) {
      const closeTimeout = setTimeout(() => onClose(), autoClose);

      return () => clearTimeout(closeTimeout);
    }
  }, [open]);

  if (!open || !modalElement) return null;

  return createPortal(
    <>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed left-1/2 top-1/2 z-50 flex min-w-[440px] -translate-x-1/2 -translate-y-1/2 items-start gap-6 rounded-lg border border-d200 bg-d10 p-6"
        onClick={onClose}
      >
        {/* <img className="h-8 w-8" src={iconUrl} alt="modal icon image" /> */}
        <Info />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </>,
    modalElement
  );
}
