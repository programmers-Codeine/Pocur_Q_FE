import { getCustomerToken } from '@/apis/customer.api';
import useCustomerStore from '@/stores/useCustomerStore';
import useSocketStore from '@/stores/useCustomerSocketStore';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCustomerTableNo } = useCustomerStore();
  const { setSocket } = useSocketStore();

  const handleMoveHome = async () => {
    if (location.search !== '') {
      try {
        const [restaurantId, tableNum] = location.search
          .replace('?restaurant_id=', '')
          .replace('&table_num=', ',')
          .split(',');
        const jwtStatus = await getCustomerToken({
          restaurantId,
          tableNum,
        });

        if (jwtStatus === 200) {
          setCustomerTableNo(Number(tableNum));
          setSocket(restaurantId);
          navigate('/customer/home');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleMoveHome();
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-around bg-b50">
      <div className="lg:text-lg lg:font-bold lg:text-gray-700 max-[1024px]:hidden">
        Customer Page in DeskTop
      </div>

      <div className="h-full w-full border border-d10 bg-d10 shadow-lg customer:w-[430px]">
        <Outlet />
      </div>
    </div>
  );
}
