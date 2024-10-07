import useTableStore from '@/stores/useTableStore';
import { TableProps } from './Table.types';
import { Trash } from '@/assets/icons';
import WarnModalContainer from '@/components/common/Modal/WarnModalContainer';
import ModalTitle from '@/components/common/Modal/Content/ModalTitle';
import { useState } from 'react';
import ModalContent from '@/components/common/Modal/Content/ModalContent';
import ModalButton from '@/components/common/Modal/Button/ModalButton';

export default function Table({ table }: TableProps) {
  const { tableNo, orderList, totalPrice, newOrderNo } = table;
  const { deleteTable } = useTableStore();
  const [openWarnModal, setOpenWarnModal] = useState(false);
  // TODO 서버에서 받아오기
  // 서버 요청을 통해 받아올 기본 테이블 수 임시 변수
  const defaultTableCount = 1;

  // TODO 서버 요청 구현 필요
  const handleDeleteTable = () => {
    deleteTable(tableNo);
  };
  const handleOpenWarnModal = () => {
    setOpenWarnModal(true);
  };
  const handleCloseWarnModal = () => {
    setOpenWarnModal(false);
  };

  return (
    <div
      key={tableNo}
      className="max-w-1/6 relative flex max-h-[170px] min-h-[155px] min-w-[240px] cursor-pointer flex-col rounded-lg border border-d900 p-4 text-d900"
    >
      {newOrderNo !== 0 && (
        <div className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-b300 font-bold text-d10">
          {newOrderNo}
        </div>
      )}
      <div className="relative text-xl font-bold">
        {tableNo}번
        {tableNo > defaultTableCount && (
          <div className="absolute right-1 top-1 hover:text-b300" onClick={handleOpenWarnModal}>
            <Trash width={20} height={20} />
          </div>
        )}
      </div>
      <ol className="flex-1 px-2 py-1">
        {orderList.map(({ menuName, menuQuantity }) => (
          <li key={menuName}>
            {menuName}*{menuQuantity}
          </li>
        ))}
      </ol>
      <div className="w-full text-right text-xl font-bold">{totalPrice}원</div>
      <WarnModalContainer open={openWarnModal}>
        <ModalTitle>{tableNo}번 테이블을 삭제하겠습니까?</ModalTitle>
        <ModalContent>테이블에 있던 정보가 모두 사라집니다.</ModalContent>
        <div className="mt-3 flex gap-2">
          <ModalButton type="warn" onClick={handleDeleteTable}>
            네
          </ModalButton>
          <ModalButton onClick={handleCloseWarnModal}>아니오</ModalButton>
        </div>
      </WarnModalContainer>
    </div>
  );
}
