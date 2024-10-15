import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { NoImage, ToggleOff, ToggleOn } from '@/assets/icons';
import { ChangeEvent, useState } from 'react';
import { InputEtcFormTypes } from '@/types';
import Slider from '@/components/common/Slider/Slider';

export default function EtcPage() {
  const [inputEtcForm, setInputEtcForm] = useState<InputEtcFormTypes>({
    tableCount: 0,
    shopName: '',
    shopLogo: '',
    comment: {
      introduce: '',
      success: '',
    },
    tools: {
      prepayment: false,
    },
  });

  const onSetInputEtcForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id.startsWith('comment-')) {
      const key = id.split('-')[1];
      setInputEtcForm(prev => ({
        ...prev,
        comment: {
          ...prev.comment,
          [key]: value,
        },
      }));
    } else {
      setInputEtcForm(prev => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const onToggleTools = (key: keyof typeof inputEtcForm.tools) => {
    setInputEtcForm(prev => ({
      ...prev,
      tools: {
        ...prev.tools,
        [key]: !prev.tools[key],
      },
    }));
  };

  return (
    <div className="flex h-full">
      <div className="flex h-full w-[50%] flex-col justify-between">
        <div className="flex flex-col gap-4 overflow-scroll">
          <div>
            <Slider
              id="tableCount"
              label="기본 테이블 수"
              subText="가게에서 사용하는 테이블 갯수를 설정할 수 있어요"
              min={1}
              max={50}
              use="smallLabel"
              value={inputEtcForm.tableCount}
              handleSliderChange={onSetInputEtcForm}
            />
          </div>
          <div>
            <Input
              id="shopName"
              type="text"
              placeholder="가게 이름을 적어주세요."
              value={inputEtcForm.shopName}
              handleInputChange={onSetInputEtcForm}
              label="가게 이름 설정"
            />
          </div>
          <div>
            <label className="text-em font-semibold">가게 로고 설정</label>
            <div className="my-2 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-4">
              <NoImage />
              <p className="text-d200">이미지 업로드</p>
            </div>
            <div className="w-full text-base text-d200">
              <p>가게 로고를 설정할 수 있어요.</p>
              <p>설정하지 않으면 기본 아이콘이 사용돼요.</p>
            </div>
          </div>

          <div>
            <Input
              id="comment-introduce"
              type="text"
              placeholder="가게 소개 멘트를 적어주세요."
              value={inputEtcForm.comment.introduce}
              handleInputChange={onSetInputEtcForm}
              label="가게 소개 멘트(30자 이내)"
              subText={{ text: '상단에 작성되는 가게 소게 문구입니다.' }}
            />
          </div>
          <div>
            <Input
              id="comment-success"
              type="text"
              placeholder="주문 성공 멘트를 적어주세요."
              value={inputEtcForm.comment.success}
              handleInputChange={onSetInputEtcForm}
              label="주문 성공 멘트"
              subText={{ text: '소비자가 주문에 성공하면 뜨는 문구입니다.' }}
            />
          </div>

          <div className="mr-2 flex justify-between">
            <div>
              <p className="text-em font-semibold">소비자 선결제 기능</p>
              <p className="text-base text-d200">소비자가 결제 해야 주문이 들어와요.</p>
            </div>
            {inputEtcForm.tools.prepayment ? (
              <ToggleOn
                width="32"
                height="32"
                className="cursor-pointer"
                onClick={() => onToggleTools('prepayment')}
              />
            ) : (
              <ToggleOff
                width="32"
                height="32"
                className="cursor-pointer"
                onClick={() => onToggleTools('prepayment')}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button title="저장하기" type="others" />
        </div>
      </div>
      <div className="flex h-full w-[50%] flex-col items-center gap-1">
        <div className="flex min-h-[36px] gap-2"></div>
        <div className="bg-deviceFrame relative aspect-[412/912] w-[50%] bg-contain bg-center bg-no-repeat">
          <div className="absolute inset-0 px-[2%] py-[15%]"></div>
        </div>
      </div>
    </div>
  );
}
