import clsx from 'clsx';
import { ButtonProps } from './Button.types';

export default function Button({ children, title, type, state, size, onClick }: ButtonProps) {
  return (
    <div className={clsx('w-full max-w-[400px]', size === 'small' ? '' : 'min-w-[280px]')}>
      <button
        className={clsx(
          'flex w-full items-center justify-center rounded-lg border py-2 text-2xl',
          type === 'menu' &&
            (state === 'normal'
              ? 'border-d900 bg-b50 text-d700 hover:bg-menuHover'
              : 'border-d700 bg-d900 font-bold text-d10 hover:border-d400 hover:bg-d400'),
          type === 'others' && 'border-d900 bg-b300 font-bold text-d10 hover:bg-b500',
          type === 'warn' && 'border-d900 bg-highlightRed text-d10 hover:opacity-80'
        )}
        onClick={onClick}
      >
        {title}
      </button>
      {children}
    </div>
  );
}
