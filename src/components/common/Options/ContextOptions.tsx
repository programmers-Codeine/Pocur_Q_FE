import { ContextOptionsProps } from './ContextOptions.types';

export default function ContextOptions({
  options = [
    { id: 1, name: '적용하기' },
    { id: 2, name: '수정하기' },
    { id: 3, name: '삭제하기' },
  ],
  onClick,
}: ContextOptionsProps) {
  const firstOption = 'rounded-t-lg';
  const bar = 'border-b border-d400 mx-2';
  const lastOption = 'rounded-b-lg';
  return (
    <div className="bg-d10 m-2 border border-d400 rounded-lg">
      {options.map((option, idx) => {
        return (
          <>
            <div
              className={`px-3 py-1 hover:bg-d30
            ${idx === 0 && firstOption}
            ${idx === options.length - 1 && lastOption}`}
              key={option.id}
              onClick={() => onClick(option.id)}
            >
              <p className="font-base text-d400">{option.name}</p>
            </div>
            {idx !== options.length - 1 && <div className={bar}></div>}
          </>
        );
      })}
    </div>
  );
}
