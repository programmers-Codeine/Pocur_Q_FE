import { Arrow } from '@/assets/icons';
import { DesignThemeTypes } from '@/types';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type NavHeaderProps = {
  children: ReactNode;
  theme?: DesignThemeTypes;
};

export default function NavHeader({ children, theme }: NavHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center border-b border-d50 py-2">
      <div
        className="absolute left-1 top-1/2 flex w-[1.5rem] -translate-y-1/2"
        onClick={() => {
          if (!theme) navigate(-1);
        }}
      >
        <Arrow style={{ fill: theme?.all.icon }} />
      </div>
      <div className="pb-1 text-2xl font-bold" style={{ color: theme?.all.largeText }}>
        {children}
      </div>
    </div>
  );
}
