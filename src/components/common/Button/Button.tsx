import { ButtonProps } from './Button.types';

export default function Button({ children, title, type, state, onClick }: ButtonProps) {
  return (
    <div className="w-full min-w-[280px] max-w-[400px]">
      <button
        className={`w-full flex justify-center items-center border rounded-lg py-2 text-2xl
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
