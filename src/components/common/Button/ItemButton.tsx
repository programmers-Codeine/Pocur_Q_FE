import clsx from 'clsx';
import { ItemButtonProps } from './Button.types';

export default function ItemButton({
  theme,
  title,
  state,
  onContextMenu,
  onClick,
}: ItemButtonProps) {
  // TODO 소비자 화면은 휴대폰으로 확인 후 실제 사이즈 조절

  return (
    <div
      className={clsx(
        'flex h-[36px] cursor-pointer items-center rounded-lg border px-4 py-2',
        state === 'normal' && 'border-d200 text-d200',
        state === 'active' && 'border-b300 text-b300',
        state === 'select' && 'border-b300 bg-b300 text-d10'
      )}
      style={{
        borderColor:
          state === 'normal' ? theme?.button.normal.outline : theme?.button.active.outline,
        backgroundColor:
          state === 'normal' ? theme?.button.normal.background : theme?.button.active.background,
        color:
          state === 'normal' ? theme?.button.normal.textAndIcon : theme?.button.active.textAndIcon,
      }}
      onContextMenu={onContextMenu}
      onClick={onClick}
    >
      <p>{title}</p>
    </div>
  );
}
