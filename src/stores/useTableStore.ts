import { deleteAllOrder, deleteOrderById, getAllOrders } from '@/apis/orders.api';
import { addTable, deleteTable, getAllTables } from '@/apis/restaurantTables.api';
import { getAllUrls } from '@/apis/urls.api';
import { Order, Table } from '@/pages/Manage/Table/Table.types';
import { create } from 'zustand';

type TableState = {
  tables: Table[];

  fetchTables: () => void;
  addTable: () => void;
  deleteTable: (tableNo: number) => void;
  resetTable: (tableNo: number) => void;
  addNewOrder: (tableNo: number) => void;
  checkOneNewOrder: (tableNo: number) => void;
  checkAllNewOrder: (tableNo: number) => void;
  fetchOrders: () => void;

  selectedOrderId: string;

  setSelectedOrderId: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;

  socketOrder: { order: { callName: string; tableNum: number }; time: string }[];
  addSocketOrder: (order: { callName: string; tableNum: number }) => void;
  deleteSocketOrder: (index: number) => void;
  deleteSocketOrderByTableNo: (tableNo: number) => void;
};

const useTableStore = create<TableState>()(set => ({
  tables: [],
  fetchTables: async () => {
    try {
      const tables = await getAllTables();
      const urls = await getAllUrls();
      const orders = await getAllOrders();
      const newTables: Table[] = [];
      const tableNewOrder =
        localStorage.getItem('tableNewOrder') === null
          ? Array(tables.length).fill(0)
          : JSON.parse(localStorage.getItem('tableNewOrder')!);

      // TODO 데이터 mapping 하기 vs order 추가를 따로하기

      // TODO urls.sort() vs urls.find() 어떤게 더 효율적인가?
      tables.forEach(({ id, table_num }, index) => {
        const newOrderList: Order[] = [...orders]
          .filter(order => order.tableNum === table_num)
          .map(order => ({
            id: order.id,
            menuName: order.menu.menuName,
            menuQuantity: order.count,
            menuOptions: order.options.map(option => ({ ...option, optionQuantity: 1 })),
            price: order.menu.price,
            totalPrice: order.totalPrice,
          }));
        const newUrl = urls.find(url => url.url.includes(`table_num=${table_num}`))?.url ?? '';

        newTables.push({
          id,
          tableNo: table_num,
          orderList: newOrderList,
          totalPrice: newOrderList.reduce((a, order) => a + order.totalPrice, 0),
          newOrderNo: tableNewOrder[index],
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
  resetTable: resetTableNo => {
    deleteAllOrder(resetTableNo)
      .then(() => {
        set(state => ({
          tables: state.tables.map(table => {
            if (table.tableNo === resetTableNo) {
              return { ...table, orderList: [], totalPrice: 0 };
            }
            return table;
          }),
        }));
      })
      .catch(() => {
        // TODO 에러 처리
      });
  },
  addNewOrder: tableNo => {
    set(state => {
      const tableNewOrder = Array(state.tables.length).fill(0);
      const newTable = state.tables.map((table, index) => {
        if (table.tableNo === tableNo) {
          tableNewOrder[index] = table.newOrderNo + 1;
          return { ...table, newOrderNo: table.newOrderNo + 1 };
        }
        tableNewOrder[index] = table.newOrderNo;
        return table;
      });

      localStorage.setItem('tableNewOrder', JSON.stringify(tableNewOrder));

      return {
        tables: newTable,
      };
    });
  },
  checkOneNewOrder: tableNo => {
    set(state => {
      const tableNewOrder = Array(state.tables.length).fill(0);
      const newTable = state.tables.map((table, index) => {
        if (table.tableNo === tableNo) {
          tableNewOrder[index] = table.newOrderNo === 0 ? 0 : table.newOrderNo - 1;
          return { ...table, newOrderNo: table.newOrderNo === 0 ? 0 : table.newOrderNo - 1 };
        }
        tableNewOrder[index] = table.newOrderNo;
        return table;
      });

      localStorage.setItem('tableNewOrder', JSON.stringify(tableNewOrder));

      return {
        tables: newTable,
      };
    });
  },
  checkAllNewOrder: tableNo => {
    set(state => {
      const tableNewOrder = Array(state.tables.length).fill(0);
      const newTable = state.tables.map((table, index) => {
        if (table.tableNo === tableNo) {
          tableNewOrder[index] = 0;
          return { ...table, newOrderNo: 0 };
        }
        tableNewOrder[index] = table.newOrderNo;
        return table;
      });

      localStorage.setItem('tableNewOrder', JSON.stringify(tableNewOrder));

      return {
        tables: newTable,
      };
    });
  },
  fetchOrders: async () => {
    const orders = await getAllOrders();

    set(state => ({
      tables: state.tables.map(table => {
        const newOrderList: Order[] = [...orders]
          .filter(order => order.tableNum === table.tableNo)
          .map(order => ({
            id: order.id,
            menuName: order.menu.menuName,
            menuQuantity: order.count,
            menuOptions: order.options.map(option => ({ ...option, optionQuantity: 1 })),
            price: order.menu.price,
            totalPrice: order.totalPrice,
          }));

        return {
          ...table,
          orderList: newOrderList,
          totalPrice: newOrderList.reduce((a, order) => a + order.totalPrice, 0),
        };
      }),
    }));
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
  socketOrder: JSON.parse(localStorage.getItem('socketOrder') ?? '[]'),
  addSocketOrder: order => {
    const date = new Date();
    set(state => {
      const newSocketOrder = [
        ...state.socketOrder,
        {
          order,
          time: `${date.getHours()}:${date.getMinutes()}`,
        },
      ];

      localStorage.setItem('socketOrder', JSON.stringify(newSocketOrder));

      return {
        socketOrder: newSocketOrder,
      };
    });
  },
  deleteSocketOrder: index => {
    set(state => {
      const newSocketOrder = state.socketOrder.filter((_, idx) => idx !== index);

      localStorage.setItem('socketOrder', JSON.stringify(newSocketOrder));

      return { socketOrder: newSocketOrder };
    });
  },
  deleteSocketOrderByTableNo: tableNo => {
    set(state => {
      const newSocketOrder = state.socketOrder.filter(({ order }) => order.tableNum !== tableNo);

      localStorage.setItem('socketOrder', JSON.stringify(newSocketOrder));

      return {
        socketOrder: newSocketOrder,
      };
    });
  },
}));

export default useTableStore;
