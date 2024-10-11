import Button from '@/components/common/Button/Button';
import { MouseEvent, useEffect, useState } from 'react';
import Tabs from './Table/Tabs';
import Table from './Table/Table';
import Tab from './Table/Tab';
import QRCard from './Table/QRCard';
import useTableStore from '@/stores/useTableStore';
import DetailModalContainer from '../../components/TableDetailModal/DetailModalContainer';
import { Table as TTable } from './Table/Table.types';
import WarnModalContainer from '@/components/common/Modal/WarnModalContainer';
import ModalTitle from '@/components/common/Modal/Content/ModalTitle';
import ModalButton from '@/components/common/Modal/Button/ModalButton';
import ModalContent from '@/components/common/Modal/Content/ModalContent';
import DetailModal from './Table/DeatailModal';
import { downloadAllQR, printAllQR } from '@/utils/QR';
import useContextMenuStore from '@/stores/useContextMenuStore';
import ContextOptions from '@/components/common/Options/ContextOptions';
import { TABLE_ORDER_OPTIONS } from '@/constants/options';

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
  const [currentTable, setCurrentTable] = useState<TTable | null>();
  const { tables, fetchTables, addTable } = useTableStore();
  const { openMenu, isVisible } = useContextMenuStore();

  useEffect(() => {
    fetchTables();
  }, []);

  const handleAddTable = () => {
    addTable();
  };
  const handleTabChange = (id: string) => {
    setCurrentTab(id);
  };
  const handleDetailModalOpen = (table: TTable) => {
    setCurrentTable(table);
    setOpenDetailModal(true);
  };
  const handleDetailModalClose = () => {
    setOpenDetailModal(false);
    setCurrentTable(null);
  };
  const handleWarnModalOpen = () => {
    setOpenWarnModal(true);
  };
  const handleWarnModalClose = () => {
    setOpenWarnModal(false);
  };
  const handleTableInit = () => {
    setWarnModalData({
      title: '테이블을 초기화하시겠습니까?',
      desc: '해당 테이블의 정보가 모두 삭제됩니다.',
      yesText: '네',
      noText: '아니오',
    });
    handleWarnModalOpen();
  };
  // TODO 테이블 초기화 시 동작 구현
  // TODO 결제하기 클릭 시 테이블 초기화
  const handleOpenTableOrderOptions = (e: MouseEvent, id: number) => {
    const { clientX, clientY } = e;
    // TODO 기존 clientX, clientY를 사용하는 경우 오차가 발생하기 때문에 오차를 줄였지만, 추가 수정이 필요함
    openMenu(
      id,
      clientX - e.currentTarget.clientWidth * 0.4,
      clientY - e.currentTarget.clientHeight * 0.3
    );
  };
  const handleClickTableOrderOption = (id: number) => {
    if (id === 1) {
      // TODO 주문 목록 수정 로직
    } else {
      // TODO 주문 취소 로직
    }
  };

  return (
    <div className="relative flex h-full flex-col" id="tableModal">
      <Tabs>
        <Tab
          id="table"
          leftPosition="left-[0px]"
          currentTab={currentTab}
          handleTabChange={handleTabChange}
        >
          테이블
        </Tab>
        <Tab
          id="qr"
          leftPosition="left-[130px]"
          currentTab={currentTab}
          handleTabChange={handleTabChange}
        >
          QR
        </Tab>
      </Tabs>
      {/* Table과 QR에 대한 부분 Tables, QRCards 컴포넌트로 분리? */}
      {currentTab === 'table' ? (
        <div className="flex h-full flex-wrap content-start gap-5 overflow-y-scroll p-10">
          {tables.map(table => (
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
          <div
            className="flex h-full flex-wrap content-start gap-5 overflow-y-scroll p-10"
            id="qrDiv"
          >
            {tables.map(({ tableNo, url }) => (
              <QRCard tableNo={tableNo} key={tableNo} qrUrl={url} />
            ))}
          </div>
          <div className="flex justify-center gap-2 py-[6px]">
            <Button
              title="전체 QR 이미지 저장"
              type="others"
              onClick={() => {
                downloadAllQR();
              }}
            />
            <Button
              title="전체 QR 프린트"
              type="others"
              onClick={() => {
                printAllQR(tables);
              }}
            />
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
      {currentTable && (
        <DetailModalContainer open={openDetailModal}>
          <DetailModal
            currentTable={currentTable}
            onCloseModal={handleDetailModalClose}
            onInitTable={handleTableInit}
            onContextMenu={handleOpenTableOrderOptions}
          />
        </DetailModalContainer>
      )}
      {isVisible && (
        <ContextOptions options={TABLE_ORDER_OPTIONS} onClick={handleClickTableOrderOption} />
      )}
    </div>
  );
}
