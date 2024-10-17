import { DesignThemeTypes } from '@/types';
import NavHeader from '@/components/customer/NavHeader';
import { SquareMinus, SquarePlus, Basket } from '@/assets/icons';
import IconButton from '@/components/customer/IconButton';

type MenuFrameProps = {
  theme: DesignThemeTypes;
};

const sampleData = {
  categoryId: 'cb57c724-ee1e-4338-994e-0d87f43d0004',
  categoryName: '사이드2',
  created_at: '2024-10-15T06:42:02.000Z',
  hot: true,
  id: '0ac695f2-22a6-44c5-a469-cb64fa77f500',
  isActive: true,
  isRunningOut: false,
  menuDetail: '1',
  menuImg: 'https://pocurq.s3.ap-northeast-2.amazonaws.com/image/main/1728974491905-sandwich.jpeg',
  menuName: '짜장면',
  new: false,
  options: [
    { id: '1', optionName: '옵션 1', optionPrice: 500 },
    { id: '2', optionName: '옵션 2', optionPrice: 1000 },
  ],
  origin: '없음',
  price: 8000,
  soldOut: false,
  updated_at: '2024-10-16',
};

export default function DetailMenuFrame({ theme }: MenuFrameProps) {
  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <NavHeader theme={theme} isAdmin={true}>
        menuName
      </NavHeader>
      <div
        className="flex flex-col border-b border-d50 px-2 py-6"
        style={{ backgroundColor: theme.all.box, borderColor: theme.all.boxOutline }}
      >
        <img className="h-40 w-[80%] self-center" src={sampleData.menuImg} alt="메뉴 이미지" />
        <div className="text-base text-d200" style={{ color: theme.all.smallText }}>
          {sampleData.menuDetail}
        </div>
        <div className="text-base text-d200" style={{ color: theme.all.smallText }}>
          {sampleData.origin}
        </div>
      </div>
      <div
        className="flex flex-1 flex-col items-center p-2"
        style={{ backgroundColor: theme.all.box }}
      >
        <div className="text-xl font-bold" style={{ color: theme.all.largeText }}>
          추가 옵션
        </div>
        <ul className="w-full text-base font-bold text-d200" style={{ color: theme.all.smallText }}>
          {sampleData.options
            ?.map(option => ({ ...option }))
            .map(({ id, optionName, optionPrice }) => (
              <li key={id} className="flex justify-between py-2">
                <input type="checkbox" className="w-4" />
                <div>{optionName}</div>
                <div>+{optionPrice.toLocaleString()}원</div>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex items-center justify-between border-y border-d50 p-2 text-xl font-bold">
        <div style={{ color: theme.all.largeText }}>수량</div>
        <button className="flex h-6 w-6 items-center justify-center disabled:text-d80">
          <SquareMinus style={{ stroke: theme.all.icon }} />
        </button>
        <div className="w-6 text-center" style={{ color: theme.all.largeText }}>
          1
        </div>
        <button className="flex h-6 w-6 items-center justify-center disabled:text-d80">
          <SquarePlus style={{ stroke: theme.all.icon }} />
        </button>
      </div>
      <div
        className="flex w-full justify-end gap-1 p-2 text-xl font-bold"
        style={{ color: theme.all.largeText }}
      >
        주문 금액:
        <div className="w-24 text-end">14400 원</div>
      </div>
      {/* 주문 버튼 */}
      <div className="self-center py-2">
        <IconButton title="장바구니에 담기" theme={theme}>
          <Basket style={{ fill: theme.button.active.textAndIcon }} />
        </IconButton>
      </div>
    </div>
  );
}
