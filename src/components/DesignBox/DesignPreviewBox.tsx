import { NAVIGATION_DESIGN } from '@/constants/designs';
import useDesignStore from '@/stores/useDesignStore';
import clsx from 'clsx';
import { DesignPreviewBoxProps } from './DesignBox.types';
import IntroFrame from './DesignPreviewFrame/IntroFrame';
import MenuFrame from './DesignPreviewFrame/MenuFrame';
import DetailMenuFrame from './DesignPreviewFrame/DetailMenuFrame';
import CartFrame from './DesignPreviewFrame/CartFrame';

export default function DesignPreviewBox({ onNavigate, theme }: DesignPreviewBoxProps) {
  const { navigation } = useDesignStore();

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
            <IntroFrame
              icon={theme.all.icon}
              largeText={theme.all.largeText}
              smallText={theme.all.smallText}
            />
          )}
          {navigation === 3 && <MenuFrame theme={theme} />}
          {navigation === 4 && <DetailMenuFrame theme={theme} />}
          {navigation === 5 && <CartFrame theme={theme} />}
        </div>
      </div>
    </div>
  );
}
