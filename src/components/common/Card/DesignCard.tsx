import { DesignCardProps } from './DesignCard.types';

export default function DesignCard({
  title = '디자인 이름이름',
  edit = '최근에 수정됨',
  image,
  state = 'normal',
  onContextMenu,
}: DesignCardProps) {
  const className = {
    getState: () => {
      switch (state) {
        case 'normal':
          return ['border-d900 bg-d10 hover:border-d700 hover:bg-d30', 'text-d700 hover:text-d700'];
        case 'active':
          return ['border-d900 bg-d900 hover:border-d700 hover:bg-d700', 'text-d10 hover:text-d10'];
        default:
          return ['', ''];
      }
    },
  };

  return (
    <div
      className={`flex flex-col w-[320px] h-[280px] p-4 gap-4 
    ${className.getState()[0]} border rounded-lg`}
      onContextMenu={onContextMenu}
    >
      <div className="bg-d10 w-full h-full border flex justify-center items-center">
        <img src={image} alt="design preview" />
      </div>
      <div className={className.getState()[1]}>
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-base">{edit}</p>
      </div>
    </div>
  );
}
