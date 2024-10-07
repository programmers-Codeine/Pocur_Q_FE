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
        { menuName: '돼지수육', menuQuantity: 1 },
        { menuName: '소주', menuQuantity: 2 },
        { menuName: '탕수육', menuQuantity: 1 },
      ],
      totalPrice: 0,
      newOrderNo: 1,
    },
  ],
  addTable: newTableNo => {
    set(state => ({
      tables: [
        ...state.tables,
        { tableNo: newTableNo, orderList: [], totalPrice: 0, newOrderNo: 0 },
      ],
    }));
  },
  deleteTable: delTableNo => {
    set(state => ({ tables: state.tables.filter(({ tableNo }) => tableNo !== delTableNo) }));
  },
}));

export default useTableStore;
