import useDesignStore from '@/stores/useDesignStore';
import DesignCard from '../common/Card/DesignCard';
import { DesignHomeBoxProps } from './DesignBox.types';

export default function DesignHomeBox({
  onOpenDesignOptions,
  onNavigate,
}: DesignHomeBoxProps) {
  const { designs, selected } = useDesignStore();
  return (
    <div className="flex h-full w-auto flex-wrap content-start gap-4 overflow-scroll">
      {designs.map(({ id, title, edit }) => (
        <DesignCard
          key={id}
          title={title}
          edit={id === selected ? '적용 중' : edit}
          state={id === selected ? 'active' : 'normal'}
          onContextMenu={e => onOpenDesignOptions(e, id)}
        />
      ))}
      <DesignCard state="none" onClick={() => onNavigate(2)} />
    </div>
  );
}
