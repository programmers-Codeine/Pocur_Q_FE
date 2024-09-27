import { PropsWithChildren } from 'react';

export default function ModalContent({ children }: PropsWithChildren) {
  return <div className="mt-2 text-d200 text-base">{children}</div>;
}
