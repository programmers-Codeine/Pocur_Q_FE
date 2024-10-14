import { deleteOrderById, getAllOrders } from '@/apis/orders.api';
import { addTable, deleteTable, getAllTables } from '@/apis/restaurantTables.api';
import { getAllUrls } from '@/apis/urls.api';
import { Order, Table } from '@/pages/Manage/Table/Table.types';
import { create } from 'zustand';

type TableState = {
  tables: Table[];

  fetchTables: () => void;
  addTable: () => void;
  deleteTable: (tableNo: number) => void;

  selectedOrderId: string;

  setSelectedOrderId: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;
};

const useTableStore = create<TableState>()(set => ({
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
  fetchTables: async () => {
    try {
      const tables = await getAllTables();
      const urls = await getAllUrls();
      const orders = await getAllOrders();
      const newTables: Table[] = [];

      // TODO 데이터 mapping 하기 vs order 추가를 따로하기

      // TODO urls.sort() vs urls.find() 어떤게 더 효율적인가?
      tables.forEach(({ id, table_num }) => {
        const newOrderList: Order[] = [...orders]
          .filter(order => order.tableNum === table_num)
          .map(order => ({
            id: order.id,
            menuName: order.menu.menuName,
            menuQuantity: order.count,
            menuOptions: order.options.map(option => ({ ...option, optionQuantity: 1 })),
            price: order.menu.price,
          }));
        const newUrl = urls.find(url => url.url.includes(`table_num=${table_num}`))?.url ?? '';

        newTables.push({
          id,
          tableNo: table_num,
          orderList: newOrderList,
          totalPrice: 0,
          newOrderNo: 0,
          url: newUrl,
        });
      });

      set(() => ({
        tables: newTables,
      }));
    } catch (error) {
      // TODO 에러 처리
    }
  },
  addTable: async () => {
    const { id, table_num } = await addTable();
    const urls = await getAllUrls();
    const newUrl = urls.find(url => url.url.includes(`table_num=${table_num}`))?.url ?? '';

    set(state => ({
      tables: [
        ...state.tables,
        {
          id,
          tableNo: table_num,
          orderList: [],
          totalPrice: 0,
          newOrderNo: 0,
          url: newUrl,
        },
      ],
    }));
  },
  deleteTable: delTableNo => {
    deleteTable(delTableNo)
      .then(() => {
    set(state => ({ tables: state.tables.filter(({ tableNo }) => tableNo !== delTableNo) }));
      })
      .catch(() => {
        // TODO 에러 처리
      });
  },
  selectedOrderId: '',
  setSelectedOrderId: selectedOrderId => {
    set(() => ({ selectedOrderId }));
  },
  deleteOrder: delOrderId => {
    deleteOrderById(delOrderId)
      .then(() => {
        set(state => ({
          tables: state.tables.map(table => ({
            ...table,
            orderList: table.orderList.filter(order => order.id !== delOrderId),
          })),
        }));
      })
      .catch(() => {
        // TODO 에러 처리
      });
  },
}));

export default useTableStore;
