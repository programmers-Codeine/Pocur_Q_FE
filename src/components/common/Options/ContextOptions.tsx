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
  return (
    <div className="bg-d10 m-2 border border-d400 rounded-lg">
      {options.map(({ id, name }, idx) => (
        <Fragment key={id}>
          <div
            className={`px-3 py-1 hover:bg-d30
            ${idx === 0 && 'rounded-t-lg'}
            ${idx === options.length - 1 && 'rounded-b-lg'}`}
            onClick={() => onClick(id)}
          >
            <p className="font-base text-d400">{name}</p>
          </div>
          {idx !== options.length - 1 && <div className="border-b border-d400 mx-2"></div>}
        </Fragment>
      ))}
    </div>
  );
}
