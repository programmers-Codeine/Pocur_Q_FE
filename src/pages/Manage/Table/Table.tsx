import { TableProps } from './Table.types';

export default function Table({ table }: TableProps) {
  const { tableNo, orderList, totalPrice, newOrderNo } = table;

  return (
    <div
      key={tableNo
      className="max-w-1/6 relative flex max-h-[170px] min-h-[155px] min-w-[240px] cursor-pointer flex-col rounded-lg border border-d900 p-4 text-d900"
    >
      {newOrderNo !== 0 && (
        <div className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-b300 font-bold text-d10">
          {newOrderNo}
        </div>
      )}
      <div className="text-xl font-bold">{tableNo}번</div>
      <ol className="flex-1 px-2 py-1">
        {orderList.map(({ menuName, menuQuantity }) => (
          <li key={menuName}>
            {menuName}*{menuQuantity}
          </li>
        ))}
      </ol>
      <div className="w-full text-right text-xl font-bold">{totalPrice}원</div>
    </div>
  );
}
