import clsx from 'clsx';
import React from 'react';
import { SubText } from './Input.type';

interface Props {
  id: string;
  label?: string;
  type: React.HTMLInputTypeAttribute; // input의 type
  placeholder: string;
  iconUrl?: string; // icon 이미지 url 찾기
  onClickIcon?: () => void; // 상황에 맞는 API 요청
  subText?: SubText; // input 하단 안내 문구
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
        <label className="text-em font-semibold" htmlFor={id}>
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
      {subText && (
        <p className={clsx('w-full text-base text-d200', subText.warn && 'text-highlightRed')}>
          {subText.text}
        </p>
      )}
    </>
  );
}
