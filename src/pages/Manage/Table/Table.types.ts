export type MenuOption = {
  optionName: string;
  optionQuantity: number;
  optionPrice: number;
};

export type Order = {
  id: string;
  menuName: string;
  menuQuantity: number;
  menuOptions: MenuOption[];
  price: number;
  totalPrice: number;
};

export type Table = {
  id: string;
  tableNo: number;
  orderList: Order[];
  totalPrice: number;
  newOrderNo: number;
  url: string;
};

export interface TableProps {
  table: Table;
  onModalOpen: (table: Table) => void;
}
