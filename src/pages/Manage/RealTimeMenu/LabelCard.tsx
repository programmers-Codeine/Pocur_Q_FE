import { Label } from '@/assets/icons';
import { LabelCardProps } from './LabelCard.types';

export default function LabelCard({ title, labelColor }: LabelCardProps) {
  return (
    <div className="relative">
      <span className="absolute left-1/2 top-1/2 -translate-x-2/3 -translate-y-1/2 text-lg text-d10">
        {title}
      </span>
      <Label className={labelColor} />
    </div>
  );
}
