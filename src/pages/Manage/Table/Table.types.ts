export type MenuOption = {
  optionName: string;
  optionQuantity: number;
  optionPrice: number;
};

export type Order = {
  menuName: string;
  menuQuantity: number;
  menuOptions: MenuOption[];
  price: number;
};

export type Table = {
  tableNo: number;
  orderList: Order[];
  totalPrice: number;
  newOrderNo: number;
};

export interface TableProps {
  table: Table;
  onModalOpen: (table: Table) => void;
}
