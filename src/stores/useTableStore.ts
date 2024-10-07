import { Table } from '@/pages/Manage/Table/Table.types';
import { create } from 'zustand';

type TableState = {
  tables: Table[];

  addTable: (tableNo: number) => void;
  deleteTable: (tableNo: number) => void;
};

const useTableStore = create<TableState>(set => ({
  tables: [
    {
      tableNo: 1,
      orderList: [
        {
          menuName: '돼지수육',
          menuQuantity: 1,
          menuOptions: [{ optionName: '고기 추가', optionPrice: 500, optionQuantity: 2 }],
          price: 10000,
        },
        { menuName: '소주', menuQuantity: 2, menuOptions: [], price: 10000 },
        {
          menuName: '탕수육',
          menuQuantity: 1,
          menuOptions: [{ optionName: '소스 추가', optionPrice: 500, optionQuantity: 1 }],
          price: 10000,
        },
      ],
      totalPrice: 0,
      newOrderNo: 1,
      url: 'https://pocurq.shop/',
    },
  ],
  addTable: newTableNo => {
    set(state => ({
      tables: [
        ...state.tables,
        {
          tableNo: newTableNo,
          orderList: [],
          totalPrice: 0,
          newOrderNo: 0,
          url: 'https://pocurq.shop/',
        },
      ],
    }));
  },
  deleteTable: delTableNo => {
    set(state => ({ tables: state.tables.filter(({ tableNo }) => tableNo !== delTableNo) }));
  },
}));

export default useTableStore;
