export type Order = {
  menuName: string;
  menuQuantity: number;
};

export type Table = {
  tableNo: number;
  orderList: Order[];
  totalPrice: number;
  newOrderNo: number;
};

export interface TableProps {
  table: Table;
}
