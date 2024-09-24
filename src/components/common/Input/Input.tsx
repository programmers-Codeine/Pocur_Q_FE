import clsx from 'clsx';
import { InputProps } from './Input.types';

export default function Input({
  id,
  type,
  placeholder,
  value,
  handleInputChange,
  label,
  iconUrl,
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
      <div className="relative mt-2 mb-1">
        <input
          className="w-full px-4 py-2 rounded-lg text-base placeholder:text-d200 border border-d50"
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
        />
        {iconUrl && (
          <div className="absolute flex items-center justify-center right-4 top-0 h-full cursor-pointer">
            <img className="w-5 h-5" src={iconUrl} alt="input icon image" onClick={onClickIcon} />
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
