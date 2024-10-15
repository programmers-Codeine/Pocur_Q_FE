import ModalTitle from '@/components/common/Modal/Content/ModalTitle';
import { Table } from './Table.types';
import { Plus, Trash } from '@/assets/icons';
import { MouseEvent } from 'react';

interface Props {
  currentTable: Table;
  onCloseModal: () => void;
  onOpenInitModal: () => void;
  onContextMenu: (e: MouseEvent<HTMLTableRowElement>, id: number) => void;
}

export default function DetailModal({
  currentTable,
  onCloseModal,
  onOpenInitModal,
  onContextMenu,
}: Props) {
  return (
    <>
      <ModalTitle>
        <div className="relative text-3xl font-bold">
          <Plus
            className="absolute right-0 top-0 rotate-45 cursor-pointer fill-d900"
            width={25}
            height={25}
            onClick={onCloseModal}
          />
          <span className="text-5xl">{currentTable?.tableNo}</span>번 테이블
        </div>
      </ModalTitle>
      <div className="flex w-full items-center justify-between">
        <span className="text-xl font-semibold">주문 목록</span>
        <button
          className="rounded-lg border border-d900 bg-b300 p-1 text-d10"
          onClick={onOpenInitModal}
        >
          <Trash width={20} height={20} />
        </button>
      </div>
      <div className="max-h-[360px] min-h-[100px] overflow-y-scroll text-lg">
        <table className="h-full w-full">
          <thead>
            <tr>
              <th className="text-start">메뉴 이름</th>
              <th>주문 수량</th>
              <th colSpan={2}>메뉴 옵션</th>
              <th className="text-end">가격</th>
            </tr>
          </thead>
          <tbody>
            {currentTable?.orderList.map(
              ({ id, menuName, menuQuantity, menuOptions, totalPrice }, i) => (
                <tr
                  key={i + 1}
                  id={id}
                  className="text-center hover:bg-d30"
                  onContextMenu={e => onContextMenu(e, i + 1)}
                >
                  <td className="text-start">{menuName}</td>
                  <td>{menuQuantity}</td>
                  <td colSpan={2}>
                    {menuOptions.map(({ optionName, optionQuantity }) => (
                      <div key={optionName}>
                        {optionName} * {optionQuantity}
                      </div>
                    ))}
                  </td>
                  <td className="text-end">{totalPrice.toLocaleString()}원</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-baseline justify-end text-xl">
        총액:{' '}
        <span className="mx-1 text-2xl font-semibold">
          {currentTable?.totalPrice.toLocaleString()}
        </span>
        원
      </div>
      <div className="flex items-center justify-center">
        <button
          className="rounded-lg border border-d900 bg-b300 p-1 text-xl font-semibold text-d10"
          onClick={onCloseModal}
        >
          결제하기
        </button>
      </div>
    </>
  );
}
