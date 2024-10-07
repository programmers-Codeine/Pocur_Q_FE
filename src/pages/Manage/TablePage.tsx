import Button from '@/components/common/Button/Button';
import { useState } from 'react';
import Tabs from './Table/Tabs';
import Table from './Table/Table';
import Tab from './Table/Tab';
import QRCard from './Table/QRCard';
import { downloadAllQR, printAllQR } from '@/utils/QR';

const tableList = [
  {
    tableNo: 1,
    orderList: [
      { menuName: '돼지수육', menuQuantity: 1 },
      { menuName: '소주', menuQuantity: 2 },
      { menuName: '탕수육', menuQuantity: 1 },
    ],
    totalPrice: 0,
    newOrderNo: 1,
    url: 'https://naver.com',
  },
  {
    tableNo: 2,
    orderList: [],
    totalPrice: 0,
    newOrderNo: 0,
    url: 'https://pocurq.shop/admin/manage',
  },
  { tableNo: 3, orderList: [], totalPrice: 0, newOrderNo: 0, url: 'https://pocurq.shop' },
  { tableNo: 4, orderList: [], totalPrice: 0, newOrderNo: 2, url: 'https://pocurq.shop' },
  { tableNo: 5, orderList: [], totalPrice: 0, newOrderNo: 0, url: 'https://pocurq.shop' },
  { tableNo: 6, orderList: [], totalPrice: 0, newOrderNo: 0, url: 'https://pocurq.shop' },
  { tableNo: 7, orderList: [], totalPrice: 0, newOrderNo: 0, url: 'https://pocurq.shop' },
  { tableNo: 8, orderList: [], totalPrice: 0, newOrderNo: 0, url: 'https://pocurq.shop' },
  { tableNo: 9, orderList: [], totalPrice: 0, newOrderNo: 0, url: 'https://pocurq.shop' },
  { tableNo: 10, orderList: [], totalPrice: 0, newOrderNo: 0, url: 'https://pocurq.shop' },
  {
    tableNo: 71,
    orderList: [],
    totalPrice: 0,
    newOrderNo: 0,
    url: 'https://pocurq.shop/admin/manage',
  },
  { tableNo: 81, orderList: [], totalPrice: 0, newOrderNo: 0, url: 'https://pocurq.shop' },
  { tableNo: 91, orderList: [], totalPrice: 0, newOrderNo: 0, url: 'https://pocurq.shop' },
  { tableNo: 101, orderList: [], totalPrice: 0, newOrderNo: 0, url: 'https://pocurq.shop' },
  { tableNo: 21, orderList: [], totalPrice: 0, newOrderNo: 0, url: 'https://pocurq.shop' },
  { tableNo: 231, orderList: [], totalPrice: 0, newOrderNo: 0, url: 'https://pocurq.shop' },
  { tableNo: 121, orderList: [], totalPrice: 0, newOrderNo: 0, url: 'https://pocurq.shop' },
];

export default function TablePage() {
  const [currentTab, setCurrentTab] = useState('table');

  const handleAddTable = () => {};
  const handleTabChange = (id: string) => {
    setCurrentTab(id);
  };

  return (
    <div className="flex h-full flex-col">
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
      {currentTab === 'table' ? (
        <div className="flex h-full flex-wrap content-start gap-5 overflow-y-scroll p-10">
          {tableList.map(table => (
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
    </div>
  );
}
