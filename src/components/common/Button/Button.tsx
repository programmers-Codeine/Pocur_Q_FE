import { ButtonProps } from './Button.types';

export default function Button({ children, title, type, state, onClick }: ButtonProps) {
  return (
    <div>
      <button
        className={`min-w-[380px] flex justify-center items-center border rounded py-2 text-2xl
        ${
          type === 'menu' &&
          (state === 'normal'
            ? 'bg-b50 border-d900 text-d700 hover:bg-menuHover'
            : 'font-bold bg-d900 border-d700 text-d10 hover:bg-d400 hover:border-d400')
        }
        ${type === 'others' && 'font-bold bg-b300 border-d900 text-d10 hover:bg-b500'}`}
        onClick={onClick}
      >
        {title}
      </button>
      {children}
    </div>
  );
}
