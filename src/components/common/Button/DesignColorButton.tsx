import clsx from 'clsx';
import { DesignColorButtonProps } from './Button.types';

export default function DesignColorButton({ id, color, title, onClick }: DesignColorButtonProps) {
  return (
    <div
      id={id}
      className={clsx(
        'flex w-[160px] cursor-pointer items-center justify-between rounded-lg border border-d50 bg-d30 px-4 py-2'
      )}
      onClick={e => onClick(e, color)}
    >
      <p className="min-w-[100px] hover:underline">{title}</p>
      <div style={{ backgroundColor: color }} className={clsx('h-4 w-4 border border-d10')} />
    </div>
  );
}
