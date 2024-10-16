import { NAVIGATION_DESIGN } from '@/constants/designs';
import useDesignStore from '@/stores/useDesignStore';
import clsx from 'clsx';
import { DesignPreviewBoxProps } from './DesignBox.types';
import { Spinner, Logo } from '@/assets/icons';

export default function DesignPreviewBox({ onNavigate, theme }: DesignPreviewBoxProps) {
  const { navigation } = useDesignStore();

  console.log(theme);
  return (
    <div className="flex h-full w-[50%] flex-col items-center gap-1">
      <div className="flex min-h-[36px] gap-2">
        {NAVIGATION_DESIGN.map(({ id, name }) => (
          <div
            className={clsx(
              'h-fit cursor-pointer px-2 py-1',
              id === navigation ? 'rounded-lg bg-b300 font-semibold text-d10' : 'hover:border-b-4'
            )}
            key={id}
            onClick={() => onNavigate(id)}
          >
            <p>{name}</p>
          </div>
        ))}
      </div>
      <div className="relative aspect-[412/912] w-[50%] bg-deviceFrame bg-contain bg-center bg-no-repeat">
        <div
          className="absolute inset-0 mx-[2%] my-[15%]"
          style={{ backgroundColor: theme.all.background }}
        >
          {/* TODO: navigation에 따른 디자인적 요소 보여주기 */}
          {navigation === 2 && (
            <div className="relative flex h-full flex-col items-center justify-center gap-3">
              <Spinner fill={theme.all.icon} />
              <p className="text-2xl" style={{ color: theme.all.largeText }}>
                가게 이름
              </p>
              <div className="text-base" style={{ color: theme.all.smallText }}>
                <p>가게 소개란입니다.</p>
                <p>가게 소개란입니다.</p>
                <p>가게 소개란입니다.</p>
              </div>
              <Logo className="absolute bottom-6" fill={theme.all.icon} />
            </div>
          )}
          {navigation === 3 && <div>메뉴판</div>}
          {navigation === 4 && <div>메뉴상세</div>}
          {navigation === 5 && <div>장바구니 및 결제</div>}
        </div>
      </div>
    </div>
  );
}
