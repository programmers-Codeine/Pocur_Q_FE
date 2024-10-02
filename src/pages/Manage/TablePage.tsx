import Button from '@/components/common/Button/Button';
import { useState } from 'react';
import Tabs from './Table/Tabs';
import Table from './Table/Table';
import Tab from './Table/Tab';
import QRCard from './Table/QRCard';
import DetailModalContainer from '../../components/TableDetailModal/DetailModalContainer';
import { Table as TTable } from './Table/Table.types';
import { Plus, Trash } from '@/assets/icons';
import WarnModalContainer from '@/components/common/Modal/WarnModalContainer';
import ModalTitle from '@/components/common/Modal/Content/ModalTitle';
import ModalButton from '@/components/common/Modal/Button/ModalButton';
import ModalContent from '@/components/common/Modal/Content/ModalContent';

const tableList: TTable[] = [
  {
    tableNo: 1,
    orderList: [
      {
        menuName: '돼지수육',
        menuQuantity: 1,
        menuOptions: [{ optionName: '고기 추가', optionQuantity: 2, optionPrice: 500 }],
        price: 10000,
      },
      { menuName: '소주', menuQuantity: 2, menuOptions: [], price: 5000 },
      {
        menuName: '탕수육',
        menuQuantity: 1,
        menuOptions: [{ optionName: '소스 추가', optionQuantity: 2, optionPrice: 500 }],
        price: 12000,
      },
    ],
    totalPrice: 0,
    newOrderNo: 1,
  },
  { tableNo: 2, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 3, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 4, orderList: [], totalPrice: 0, newOrderNo: 2 },
  { tableNo: 5, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 6, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 7, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 8, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 9, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 10, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 71, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 81, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 91, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 101, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 21, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 231, orderList: [], totalPrice: 0, newOrderNo: 0 },
  { tableNo: 121, orderList: [], totalPrice: 0, newOrderNo: 0 },
];

type WarnModalData = {
  title: string;
  desc?: string;
  yesText: string;
  noText: string;
};

export default function TablePage() {
  const [currentTab, setCurrentTab] = useState('table');
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openWarnModal, setOpenWarnModal] = useState(false);
  const [warnModalData, setWarnModalData] = useState<WarnModalData>();
  const [currentTable, setCurrentTable] = useState<TTable>();

  const handleAddTable = () => {};
  const handleTabChange = (id: string) => {
    setCurrentTab(id);
  };
  const handleDetailModalOpen = (table: TTable) => {
    setOpenDetailModal(true);
    setCurrentTable(table);
  };
  const handleDetailModalClose = () => {
    setOpenDetailModal(false);
  };
  const handleWarnModalOpen = () => {
    setOpenWarnModal(true);
  };
  const handleWarnModalClose = () => {
    setOpenWarnModal(false);
  };
  const handleTableInit = () => {
    const title = '테이블을 초기화하시겠습니까?';
    const desc = '해당 테이블의 정보가 모두 삭제됩니다.';
    const yesText = '네';
    const noText = '아니오';

    setWarnModalData({ title, desc, yesText, noText });
    handleWarnModalOpen();
  };
  // TODO 테이블 초기화 시 동작 구현

  return (
    <>
      <div className="relative flex h-full flex-col" id="table">
        <Tabs>
          <Tab id="table" index={0} currentTab={currentTab} handleTabChange={handleTabChange}>
            테이블
          </Tab>
          <Tab id="qr" index={1} currentTab={currentTab} handleTabChange={handleTabChange}>
            QR
          </Tab>
        </Tabs>
        {currentTab === 'table' ? (
          <div className="flex h-full flex-wrap content-start gap-5 overflow-y-scroll p-10">
            {tableList.map(table => (
              <Table table={table} key={table.tableNo} onModalOpen={handleDetailModalOpen} />
            ))}
            <div
              className="max-w-1/6 relative flex max-h-[170px] min-h-[155px] min-w-[240px] cursor-pointer flex-col items-center justify-center rounded-lg border border-d900 p-4 text-2xl font-bold text-d200 hover:text-d900"
              onClick={handleAddTable}
            >
              테이블 추가+
            </div>
          </div>
        ) : (
          <>
            <div className="flex h-full flex-wrap content-start gap-5 overflow-y-scroll p-10">
              {tableList.map(({ tableNo }) => (
                <QRCard tableNo={tableNo} key={tableNo} />
              ))}
            </div>
            <div className="flex justify-center gap-2 py-[6px]">
              <Button title="전체 QR 이미지 저장" type="others" />
              <Button title="전체 QR 프린트" type="others" />
            </div>
          </>
        )}
        {warnModalData && (
          <WarnModalContainer open={openWarnModal}>
            <ModalTitle>{warnModalData.title}</ModalTitle>
            <ModalContent>{warnModalData.desc}</ModalContent>
            <div className="mt-3 flex gap-2">
              <ModalButton onClick={handleWarnModalClose} type="warn">
                {warnModalData.yesText}
              </ModalButton>
              <ModalButton onClick={handleWarnModalClose}>{warnModalData.noText}</ModalButton>
            </div>
          </WarnModalContainer>
        )}
        <DetailModalContainer open={openDetailModal}>
          <ModalTitle>
            <div className="relative text-3xl font-bold">
              <Plus
                className="absolute right-0 top-0 rotate-45 cursor-pointer"
                width={25}
                height={25}
                onClick={handleDetailModalClose}
              />
              <span className="text-5xl">{currentTable?.tableNo}</span>번 테이블
            </div>
          </ModalTitle>
          <div className="flex w-full items-center justify-between">
            <span className="text-xl font-semibold">주문 목록</span>
            <button
              className="rounded-lg border border-d900 bg-b300 p-1 text-d10"
              onClick={handleTableInit}
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
                {currentTable?.orderList.map(({ menuName, menuQuantity, menuOptions, price }) => {
                  // 옵션 가격 합
                  const totalOptionPrice = menuOptions.reduce(
                    (a, c) => a + c.optionPrice * c.optionQuantity,
                    0
                  );
                  // 총 메뉴 가격 합
                  const menuPrice = price * menuQuantity + totalOptionPrice;

                  return (
                    <tr key={menuName} className="text-center">
                      <td className="text-start">{menuName}</td>
                      <td>{menuQuantity}</td>
                      <td colSpan={2}>
                        {menuOptions.map(({ optionName, optionQuantity }) => (
                          <div key={optionName}>
                            {optionName} * {optionQuantity}
                          </div>
                        ))}
                      </td>
                      <td className="text-end">{menuPrice.toLocaleString()}원</td>
                    </tr>
                  );
                })}
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
              onClick={handleDetailModalClose}
            >
              결제하기
            </button>
          </div>
        </DetailModalContainer>
      </div>
    </>
  );
}
