import Button from '@/components/common/Button/Button';
import { useState } from 'react';
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
  const { tables, addTable } = useTableStore();

  const handleAddTable = () => {
    addTable(tables.length + 1);
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

  return (
      <div className="relative flex h-full flex-col" id="tableModal">
        <Tabs>
          <Tab id="table" index={0} currentTab={currentTab} handleTabChange={handleTabChange}>
            테이블
          </Tab>
          <Tab id="qr" index={1} currentTab={currentTab} handleTabChange={handleTabChange}>
            QR
          </Tab>
        </Tabs>
        {/* Table과 QR에 대한 부분 Tables, QRCards 컴포넌트로 분리? */}
        {currentTab === 'table' ? (
          <div className="flex h-full flex-wrap content-start gap-5 overflow-y-scroll p-10">
            {tables.map(table => (
              <Table table={table} key={table.tableNo} />
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
              {tableList.map(({ tableNo, url }) => (
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
                  printAllQR(tableList);
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
            />
          </DetailModalContainer>
        )}
      </div>
  );
}
