import { useNavigate } from 'react-router-dom';
import Input from '@/components/common/Input/Input';
import { useState } from 'react';
import { CircleArrow } from '@/assets/icons';
import clsx from 'clsx';
import { FirstPageProps } from './FirstPage.types';
import Slider from '@/components/common/Slider/Slider';

export default function FirstPage({ setIsFirstTime }: FirstPageProps) {
  const [defaultTableNum, setDefaultTableNum] = useState(0);
  const [shopName, setShopName] = useState('');
  const navigate = useNavigate();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultTableNum(parseInt(e.target.value));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShopName(e.target.value);
  };
  const handleCreateShop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // TODO API 요청
    console.log('submit', `{defaultTableNum:${defaultTableNum}, shopName:${shopName}}`);
    // 성공 시 첫 입장 처리 및 화면 이동
    setIsFirstTime(false);
    navigate('/admin/manage/table');
  };

  return (
    <div className="flex h-full w-full">
      <form className="flex-1" onSubmit={handleCreateShop}>
        <div className="flex h-full flex-col items-center justify-center gap-14">
          <div className="text-5xl font-bold text-d900">가게 정보 입력하기</div>
          <div className="w-1/2">
            <Slider
              id="defaultTableNum"
              label="기본 테이블 수"
              subText="가게에서 사용하는 테이블 갯수를 설정할 수 있어요"
              min={1}
              max={50}
              value={defaultTableNum}
              handleSliderChange={handleSliderChange}
            />
          </div>
          <div className="w-1/2 text-3xl">
            <Input
              id="shopName"
              type="text"
              placeholder="가게 이름 ex) 팔봉이네"
              label="가게 이름 설정"
              value={shopName}
              handleInputChange={handleInputChange}
              subText={{ text: '실제 가게 이름을 입력해주세요' }}
            />
          </div>
          <div
            className={clsx(
              'flex items-center justify-center gap-2 duration-300',
              defaultTableNum !== 0 && shopName !== '' ? 'text-b300' : 'text-d50'
            )}
          >
            <button
              className="text-4xl font-bold"
              disabled={defaultTableNum === 0 || shopName === ''}
            >
              관리 시작하기
            </button>
            <div className="mt-[3px] h-[48px] w-[45px]">
              <CircleArrow />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
