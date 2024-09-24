export type SubText = { text: string; warn?: boolean };

export interface InputProps {
  id: string;
  label?: string;
  type: React.HTMLInputTypeAttribute; // input의 type
  placeholder: string;
  iconUrl?: string; // icon 이미지 url 찾기
  onClickIcon?: () => void; // 상황에 맞는 API 요청
  subText?: SubText; // input 하단 안내 문구
}
