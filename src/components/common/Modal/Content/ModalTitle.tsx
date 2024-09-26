import { PropsWithChildren } from 'react';

export default function ModalTitle({ children }: PropsWithChildren) {
  return <div className="text-2xl font-semibold">{children}</div>;
}
