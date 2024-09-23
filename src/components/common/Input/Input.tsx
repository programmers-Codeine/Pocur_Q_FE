import React from 'react';

interface Props {
  id: string;
  label?: string;
  type: React.HTMLInputTypeAttribute; // input의 type
  placeholder: string;
  iconUrl?: string; // icon svg 타입 찾기
  onClickIcon?: () => void; // 상황에 맞는 API 요청
  subText?: string; // input 하단 문구(경고 문구, 안내 문구)
}

export default function Input({
  id,
  label,
  type,
  placeholder,
  iconUrl,
  onClickIcon,
  subText,
}: Props) {
  return (
    <>
      {label && (
        <label className="text-lg font-semibold" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative mt-2 mb-1">
        <input
          className="w-full px-4 py-2 rounded-lg text-base placeholder:text-d200 border border-d50"
          type={type}
          id={id}
          placeholder={placeholder}
        />
        {iconUrl && (
          <div className="absolute flex items-center justify-center right-4 top-0 h-full cursor-pointer">
            <img className="w-5 h-5" src={iconUrl} alt="input icon image" onClick={onClickIcon} />
          </div>
        )}
      </div>
      {subText && <p className="w-full text-base text-d200">{subText}</p>}
    </>
  );
}
