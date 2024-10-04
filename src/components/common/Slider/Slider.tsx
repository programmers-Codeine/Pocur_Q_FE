import { SliderProps } from './Slider.types';

export default function Slider({
  id,
  label,
  subText,
  min,
  max,
  step,
  value,
  handleSliderChange,
}: SliderProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <label className="text-3xl font-bold text-d900" htmlFor={id}>
          {label}
        </label>
        <div className="text-xl text-d900">{value}</div>
      </div>
      <div className="relative w-full">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="h-2 w-full appearance-none rounded-lg focus:outline-none [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-d700 [&::-moz-range-thumb]:bg-d700 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-d700 [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(36,55,87,1)]"
          // 동적인 처리를 위해 inline style 사용
          style={{
            background: `linear-gradient(to right, #6BA6FF ${((value - 1) / (50 - 1)) * 100}%, #E6F0FF ${((value - 1) / (50 - 1)) * 100}%)`,
          }}
        />
      </div>
      <div className="w-full text-base text-d200">{subText}</div>
    </>
  );

  return <div>테이블 페이지</div>;
}
