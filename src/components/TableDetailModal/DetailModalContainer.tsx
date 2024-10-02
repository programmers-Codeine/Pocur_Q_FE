import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '@/components/common/Modal/Modal.types';

export default function DetailModalContainer({
  open,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) {
  const modalElement = document.getElementById('table');

  if (!open || !modalElement) return null;

  return createPortal(
    <>
      <div
        className="absolute bottom-0 left-0 right-0 top-0 z-30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-1/2 z-40 flex max-h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 items-start gap-6 rounded-lg border border-d200 bg-d10 p-6">
        <div className="flex h-full flex-1 flex-col gap-5">{children}</div>
      </div>
    </>,
    modalElement
  );
}
