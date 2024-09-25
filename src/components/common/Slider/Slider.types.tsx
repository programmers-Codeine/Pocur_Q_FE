export interface SliderProps {
  id: string;
  label?: string;
  subText?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  handleSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
