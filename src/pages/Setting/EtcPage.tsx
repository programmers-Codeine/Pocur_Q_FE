import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { NoImage, ToggleOff, ToggleOn } from '@/assets/icons';
import { ChangeEvent, useState, useEffect } from 'react';
import { InputEtcFormTypes } from '@/types';
import Slider from '@/components/common/Slider/Slider';
import { getRestaurant, saveRestaurants, setLogoImage } from '@/apis/restaurants.api';

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
  const [customerPreview, setCustomerPreview] = useState({ id: '', isShow: false });

  useEffect(() => {
    getRestaurant().then(data => {
      setCustomerPreview(prev => ({ ...prev, id: data.id }));
      setInputEtcForm(prev => ({
        ...prev,
        tableCount: data.defaultTableCount || 0,
        shopName: data.name || '',
        shopLogo: data.logo || '',
        comment: {
          ...prev.comment,
          introduce: data.introduce || '',
          success: data.comment || '',
        },
      }));
    });
  }, []);

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

  const handleSaveEtc = () => {
    const { tableCount, shopName, shopLogo, comment } = inputEtcForm;
    if (tableCount && shopName) {
      saveRestaurants({
        name: shopName,
        defaultTableCount: Number(tableCount),
        logo: shopLogo,
        introduce: comment.introduce,
        comment: comment.success,
      }).then(res => console.log(res));

      setCustomerPreview(prev => ({ ...prev, isShow: true }));
    } else {
      //TODO: 입력 경고
    }
  };

  const handleLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;

    setLogoImage(file).then(res => {
      setInputEtcForm(prev => ({ ...prev, shopLogo: res.data.imageUrl }));
    });
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
            <label className="relative my-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4 hover:bg-d30">
              <input
                id="logoUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
              <div className="relative flex h-[120px] w-full items-center justify-center">
                {inputEtcForm.shopLogo ? (
                  <img
                    src={inputEtcForm.shopLogo}
                    alt="Menu Preview"
                    className="absolute left-0 top-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <NoImage width="64" height="64" className="z-10" />
                    <p className="text-d200">이미지 업로드</p>
                  </div>
                )}
              </div>
            </label>
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
            {inputEtcForm.tools?.prepayment ? (
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
          <Button title="저장하기" type="others" onClick={handleSaveEtc} />
        </div>
      </div>
      <div className="flex h-full w-[50%] flex-col items-center gap-1">
        <div className="flex min-h-[36px] gap-2"></div>
        <div className="relative aspect-[412/912] w-[50%] bg-deviceFrame bg-contain bg-center bg-no-repeat">
          <div className="absolute inset-0 mx-[2%] my-[15%]">
            {customerPreview.isShow ? (
              <iframe
                className="h-full w-full"
                title="customer-page"
                src={`https://localhost:5173/customer?restaurant_id=${customerPreview.id}&table_num=1`}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center text-xl">
                <p>저장하기를 눌러</p>
                <p>소비자 화면을 테스트 해보세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
