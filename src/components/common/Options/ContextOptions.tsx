import useContextMenuStore from '@/stores/useContextMenuStore';
import clsx from 'clsx';
import { useEffect } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { ContextOptionsProps } from './ContextOptions.types';

export default function ContextOptions({ options, onClick }: ContextOptionsProps) {
  const { isVisible, position, closeMenu } = useContextMenuStore();

  useEffect(() => {
    const handleClickOutside = () => {
      closeMenu();
    };

    window.addEventListener('click', handleClickOutside);

    return () => window.removeEventListener('click', handleClickOutside);
  }, [closeMenu]);

  if (!isVisible) return null;

  return (
    <div
      className={clsx('absolute z-50 m-2 cursor-pointer rounded-lg border border-d400 bg-d10')}
      style={{ top: position.y, left: position.x }}
      onClick={() => closeMenu()}
    >
      {options.map(({ id, name }, idx) => (
        <Fragment key={id}>
          <div
            className={`px-3 py-1 hover:bg-d30 ${idx === 0 && 'rounded-t-lg'} ${idx === options.length - 1 && 'rounded-b-lg'}`}
            onClick={() => onClick(id)}
          >
            <p className="font-base text-d400">{name}</p>
          </div>
          {idx !== options.length - 1 && <div className="mx-2 border-b border-d400"></div>}
        </Fragment>
      ))}
    </div>
  );
}
