import { Arrow } from '@/assets/icons';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavHeader({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center py-2">
      <div
        className="absolute left-1 top-1/2 flex w-[1.5rem] -translate-y-1/2"
        onClick={() => {
          navigate(-1);
        }}
      >
        <Arrow />
      </div>
      <div className="pb-1 text-2xl font-bold">{children}</div>
    </div>
  );
}
