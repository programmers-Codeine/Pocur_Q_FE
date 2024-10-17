import { NoImage, PencilQuestion } from '@/assets/icons';
import { DesignCardProps } from './DesignCard.types';

export default function DesignCard({
  title = '디자인 이름이름',
  edit = '최근에 수정됨',
  image,
  state = 'normal',
  onContextMenu,
  onClick,
}: DesignCardProps) {
  const className = {
    getState: () => {
      switch (state) {
        case 'normal':
          return ['border-d900 bg-d10 hover:border-d700 hover:bg-d30', 'text-d700 hover:text-d700'];
        case 'active':
          return ['border-d900 bg-d900 hover:border-d700 hover:bg-d700', 'text-d10 hover:text-d10'];
        default:
          return ['border-d900 bg-d10 hover:bg-d30', ''];
      }
    },
  };

  return (
    <div
      className={`flex h-[280px] w-[320px] flex-col gap-4 p-4 ${className.getState()[0]} cursor-pointer rounded-lg border`}
      onContextMenu={onContextMenu}
      onClick={onClick}
    >
      {state === 'none' ? (
        <div className="flex h-full w-full items-center justify-center gap-2">
          <span className="text-2xl font-bold text-d200">디자인 추가하러 가기</span>
          <PencilQuestion width="24" height="24" />
        </div>
      ) : (
        <>
          <div className="flex h-full w-full items-center justify-center border bg-d10">
            {image ? (
              <img src={image} alt="design preview" className="h-40 w-full object-cover" />
            ) : (
              <NoImage className="stroke-d900" width="96" height="96" />
            )}
          </div>
          <div className={className.getState()[1]}>
            <p className="text-2xl font-bold">{title}</p>
            <p className="text-base">{edit}</p>
          </div>
        </>
      )}
    </div>
  );
}
