import { ReactNode } from 'react';

export type SubText = { text: string; warn?: boolean };

export interface InputProps {
  id: string;
  type: React.HTMLInputTypeAttribute; // input의 type
  placeholder: string;
  value: string | number | readonly string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  children?: ReactNode;
  onClickIcon?: () => void; // 상황에 맞는 API 요청
  subText?: SubText; // input 하단 안내 문구
}
