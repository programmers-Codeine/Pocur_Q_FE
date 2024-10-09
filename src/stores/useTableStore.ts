import { getAllTables } from '@/apis/restaurants.api';
import { Table } from '@/pages/Manage/Table/Table.types';
import { create } from 'zustand';

type TableState = {
  tables: Table[];

  fetchTables: () => void;
  addTable: (tableNo: number) => void;
  deleteTable: (tableNo: number) => void;
};

const useTableStore = create<TableState>(set => ({
  tables: [
    {
      id: '',
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
  fetchTables: () => {
    getAllTables()
      .then(data => {
        // TODO mapping 하기 vs order 추가를 따로하기
        const newTables: Table[] = data.map(({ id, table_num }) => ({
          id,
          tableNo: table_num,
          orderList: [],
          totalPrice: 0,
          newOrderNo: 0,
          url: '',
        }));

        set(() => ({
          tables: newTables,
        }));
      })
      .catch(err => console.log(err));
  },
  addTable: newTableNo => {
    set(state => ({
      tables: [
        ...state.tables,
        {
          id: '',
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
