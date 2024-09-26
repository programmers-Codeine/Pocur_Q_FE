import useContextMenuStore from '@/stores/useContextMenuStore';
import clsx from 'clsx';
import { useEffect } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { ContextOptionsProps } from './ContextOptions.types';

const DEFAULT_OPTIONS = [
  { id: 1, name: '적용하기' },
  { id: 2, name: '수정하기' },
  { id: 3, name: '삭제하기' },
];

export default function ContextOptions({
  options = DEFAULT_OPTIONS,
  onClick,
}: ContextOptionsProps) {
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
      className={clsx('absolute m-2 rounded-lg border border-d400 bg-d10')}
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
