import ItemButton from '../common/Button/ItemButton';
import { easyFastToolData } from '@/stores/menuData';

export default function FastToolBox() {
  return (
    <div className="flex h-fit w-full flex-col gap-3 rounded-lg border border-d50 px-3 py-4">
      <div className="flex min-h-[54px] items-center gap-1 px-3 text-2xl font-bold">
        <span>빠르고 쉬운 도구</span>
        <span className="text-b500">Beta</span>
      </div>
      <div className="flex flex-wrap gap-3 px-3">
        {easyFastToolData.map(({ id, title }) => (
          <ItemButton key={id} title={title} state="normal" />
        ))}
      </div>
    </div>
  );
}
