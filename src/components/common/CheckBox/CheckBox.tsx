import clsx from 'clsx';
import { CheckBoxProps } from './CheckBox.types';

export default function CheckBox({ id, label, checked, isBold, onChange }: CheckBoxProps) {
  return (
    <label className="flex w-full cursor-pointer items-center gap-4 rounded-md p-1">
      <input
        className="h-6 w-6 cursor-pointer"
        type="checkbox"
        checked={checked}
        onChange={() => onChange(id)}
      />
      <span className={clsx('text-em', isBold && 'font-semibold')}>{label}</span>
    </label>
  );
}
