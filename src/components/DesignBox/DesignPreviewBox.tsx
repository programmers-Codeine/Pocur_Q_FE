import { NAVIGATION_DESIGN } from '@/constants/designs';
import useDesignStore from '@/stores/useDesignStore';
import clsx from 'clsx';
import { DesignPreviewBoxProps } from './DesignBox.types';

export default function DesignPreviewBox({ onNavigate }: DesignPreviewBoxProps) {
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
      <div className="bg-deviceFrame relative aspect-[412/912] w-[50%] bg-contain bg-center bg-no-repeat">
        <div className="absolute inset-0 px-[2%] py-[15%]">
          {/* TODO: navigation에 따른 디자인적 요소 보여주기 */}
          {navigation === 2 && <div>소개/로딩/결제</div>}
          {navigation === 3 && <div>메뉴판</div>}
          {navigation === 4 && <div>메뉴상세</div>}
          {navigation === 5 && <div>장바구니 및 결제</div>}
        </div>
      </div>
    </div>
  );
}
