import { Spinner, Logo } from '@/assets/icons';

type IntroFrameProps = {
  icon: string;
  largeText: string;
  smallText: string;
};
export default function IntroFrame({ icon, largeText, smallText }: IntroFrameProps) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-3">
      <Spinner fill={icon} />
      <p className="text-2xl" style={{ color: largeText }}>
        가게 이름
      </p>
      <div className="text-base" style={{ color: smallText }}>
        <p>가게 소개란입니다.</p>
        <p>가게 소개란입니다.</p>
        <p>가게 소개란입니다.</p>
      </div>
      <Logo className="absolute bottom-6" fill={icon} />
    </div>
  );
}
