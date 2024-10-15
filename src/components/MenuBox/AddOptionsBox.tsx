import { Save, Trash, Plus } from '@/assets/icons';
import Input from '../common/Input/Input';
import { AddOptionsBoxProps } from './MenuBox.types';

export default function AddOptionsBox({
  optionsInput,
  onSaveOptions,
  onSetInputOption,
  onDeleteOptions,
  onAddOptions,
}: AddOptionsBoxProps) {
  return (
    <div className="flex h-fit w-[50%] flex-col rounded-lg border border-d50 px-2 py-4">
      <div className="mx-3 flex items-center justify-between gap-3 border-b border-d50 pb-3">
        <span className="bg-d10 text-xl font-bold">추가 옵션 관리</span>
        <Save width="20" height="20" onClick={onSaveOptions} className="cursor-pointer" />
      </div>
      <div className="flex flex-col py-2">
        {optionsInput.map(({ id, optionName, price }) => (
          <div key={id} className="flex items-center gap-2 pl-4 pr-2">
            <div className="w-[60%]">
              <Input
                id={`optionName_${id}`}
                type="text"
                placeholder="옵션 이름"
                value={optionName}
                handleInputChange={onSetInputOption}
              />
            </div>
            <div className="w-[30%]">
              <Input
                id={`price_${id}`}
                type="text"
                placeholder="가격"
                value={price}
                handleInputChange={onSetInputOption}
              />
            </div>
            <Trash
              className="cursor-pointer"
              width="20"
              height="20"
              onClick={() => onDeleteOptions(id)}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3">
        <Plus width="24" height="24" onClick={onAddOptions} className="cursor-pointer fill-d900" />
      </div>
    </div>
  );
}
