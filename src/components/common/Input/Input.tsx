import clsx from 'clsx';
import { InputProps } from './Input.types';

export default function Input({
  id,
  type,
  placeholder,
  value,
  handleInputChange,
  label,
  children,
  onClickIcon,
  subText,
}: InputProps) {
  return (
    <>
      {label && (
        <label className="text-em font-semibold" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative mb-1 mt-2">
        <input
          className="w-full rounded-lg border border-d50 px-4 py-2 text-base placeholder:text-d200"
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
        />
        {children && (
          <div
            className="absolute right-4 top-0 flex h-full cursor-pointer items-center justify-center"
            onClick={onClickIcon}
          >
            {children}
          </div>
        )}
      </div>
      {subText && (
        <p className={clsx('w-full text-base text-d200', subText.warn && 'text-highlightRed')}>
          {subText.text}
        </p>
      )}
    </>
  );
}
