import { Basket, NoImage, SquareMinus, SquarePlus } from '@/assets/icons';
import IconButton from '@/components/customer/IconButton';
import NavHeader from '@/components/customer/NavHeader';
import useCustomerMenuStore from '@/stores/useCustomerStore';
import { useState } from 'react';

// TODO 컴포넌트 분리
export default function CustomerDetailMenuPage() {
  const [menuQuantity, setMenuQuantity] = useState(1);
  const [selectedOptions] = useState<number[]>([]);
  const { selectedMenu } = useCustomerMenuStore();

  if (!selectedMenu) {
    // TODO 에러처리하기
    return null;
  }

  const { title, description, origin, price, options } = selectedMenu;

  const handleReduceMenuQuantity = () => {
    // TODO 수량 조절 로직
    setMenuQuantity(prev => prev - 1);
  };
  const handleIncreaseMenuQuantity = () => {
    // TODO 수량 조절 로직
    setMenuQuantity(prev => prev + 1);
  };
  const handleSelectOption = () => {
    // TODO 옵션 선택 로직
  };
  const handleAddCart = () => {
    // TODO 장바구니 담기 로직
  };

  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      {/* 헤더 */}
      <NavHeader>{title}</NavHeader>
      {/* 메뉴 설명 */}
      <div className="flex flex-col border-b border-d50 px-2 py-6">
        <div className="mb-4 flex h-40 w-[80%] items-center justify-center self-center bg-d30">
          <NoImage />
        </div>
        <div className="text-base text-d200">{description}</div>
        <div className="text-base text-d200">{origin}</div>
      </div>
      {/* 메뉴 옵션 */}
      <div className="flex flex-1 flex-col items-center p-2">
        <div className="text-xl font-bold">추가 옵션</div>
        <ul className="w-full text-base font-bold text-d200">
          {options
            ?.map(option => ({ ...option, isChecked: false })) // 해당 부분 API 연결 시 해당 부분으로 이동
            .map(({ id, optionName, optionPrice, isChecked }) => (
              <li key={id} className="flex justify-between py-2">
                <input
                  type="checkbox"
                  className="w-4"
                  checked={isChecked}
                  onChange={() => handleSelectOption()}
                />
                <div>{optionName}</div>
                <div>+{optionPrice.toLocaleString()}원</div>
              </li>
            ))}
        </ul>
      </div>
      {/* 수량 조절 */}
      <div className="flex items-center justify-between border-y border-d50 p-2 text-xl font-bold">
        <div>수량</div>
        <button
          className="flex h-6 w-6 items-center justify-center disabled:text-d80"
          onClick={handleReduceMenuQuantity}
          disabled={menuQuantity === 1}
        >
          <SquareMinus />
        </button>
        <div className="w-6 text-center">{menuQuantity}</div>
        <button
          className="flex h-6 w-6 items-center justify-center disabled:text-d80"
          onClick={handleIncreaseMenuQuantity}
          disabled={menuQuantity === 10}
        >
          <SquarePlus />
        </button>
      </div>
      <div className="flex w-full justify-end gap-1 p-2 text-xl font-bold">
        주문 금액:
        <div className="w-24 text-end">
          {(options
            ? price * menuQuantity +
              selectedOptions.reduce((a, optionNo) => a + options[optionNo].optionPrice, 0)
            : price * menuQuantity
          ).toLocaleString()}
          원
        </div>
      </div>
      {/* 주문 버튼 */}
      <div className="self-center py-2">
        <IconButton title="장바구니에 담기" onClick={handleAddCart}>
          <Basket />
        </IconButton>
      </div>
    </div>
  );
}
