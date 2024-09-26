import { PropsWithChildren } from 'react';

export default function Tabs({ children }: PropsWithChildren) {
  return (
    <>
      <div className="relative flex h-auto w-full border-b border-d900">
        <div className="h-[49px] w-full" />
        {children}
      </div>
    </>
  );
}
