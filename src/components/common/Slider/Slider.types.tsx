export interface SliderProps {
  id: string;
  label?: string;
  subText?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  use?: 'default' | 'smallLabel';
  handleSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
