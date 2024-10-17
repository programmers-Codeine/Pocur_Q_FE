import SideBar from '@/components/SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { manageNavList, settingNavList } from '@/stores/navItemData';
import { Avatar, Logout, Setting } from '@/assets/icons';
import Button from '../Button/Button';
import useRestaurantStore from '@/stores/useRestaurantStore';
import { useEffect } from 'react';
import useTableStore from '@/stores/useTableStore';
import useAdminSocketStore from '@/stores/useAdminSocketStore';
import { getRestaurant } from '@/apis/restaurants.api';

export default function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [main, sub] = pathname.split('/').slice(2);
  const { setRestaurant } = useRestaurantStore();
  const { addSocketOrder, addNewOrder, fetchOrders } = useTableStore();
  const { socket, setSocket } = useAdminSocketStore();

  const handleConnectSocket = async () => {
    const restaurantData = await getRestaurant();

    setRestaurant(restaurantData);
    setSocket(restaurantData.id);
  };

  useEffect(() => {
    handleConnectSocket();
  }, []);

  useEffect(() => {
    // TODO 서버 업데이트 후 수정
    socket.on('newCallRequest', (data: { callName: string; tableNum: number }) => {
      addSocketOrder(data);
      addNewOrder(data.tableNum);
    });
    socket.on(
      'orderUpdate',
      ({
        orders,
      }: {
        orders: {
          tableNum: number;
          count: number;
          menu: { menuName: string };
          options: { id: string; optionName: string }[];
        }[];
      }) => {
        console.log(orders);
        orders.forEach(({ tableNum, count, menu, options }) => {
          addNewOrder(tableNum);
          addSocketOrder({
            callName: `${menu.menuName} ${options
              .map(({ optionName }) => optionName)
              .join(',')} ${count}개`,
            tableNum: tableNum,
          });
          fetchOrders();
        });
      }
    );

    return () => {
      socket.off('newCallRequest');
      socket.off('orderUpdate');
    };
  }, [socket]);

  const handleNavigate = (target: string, src: string = '') => {
    if (target === 'logout') return navigate('/'); // TODO: logout 로직 구현
    navigate(`/admin/${target}/${src}`);
  };

  const handleSaveSetting = () => {
    // TODO: 가게 이동에 대한 모달 띄우기
    navigate('/admin/manage/table');
  };

  return (
    <div className="flex h-screen w-screen gap-1.5 bg-d900 p-2">
      <aside className="flex w-[25%] flex-col justify-between rounded-l-[30px] bg-d10 p-8">
        {/* TODO: SideBar 라는 컴포넌트가 현재는 NavBar의 역할을 하고있음. 
                  컴포넌트 명을 변경하거나, 아래 aside 내에 있는 요소들을 SideBar로 이동시켜야함.
                  현재는 클릭 이벤트가 많아 Layout(부모)에 존재함.
        */}
        <div className="flex flex-col items-center gap-10">
          {/* 내정보 및 로그아웃 */}
          <div className="flex w-full items-center gap-5 border-b-2 border-d900 py-2 text-d900">
            <Avatar />
            <p className="w-full text-3xl">관리자 이름</p>
            <div
              onClick={() => {
                localStorage.clear();
                handleNavigate('logout');
              }}
            >
              <Logout />
            </div>
          </div>
          {sub && (
            <>
              {/* 설정 페이지 이동 및 현재 적용중인 디자인 보기 */}
              {main === 'manage' && (
                <div className="flex w-full items-center justify-between rounded-lg border border-d900 p-3 text-2xl">
                  <div>
                    <span>적용 중인 디자인 : </span>
                    <span className="font-bold">기본</span>
                  </div>
                  <div onClick={() => handleNavigate('setting', 'menu')}>
                    <Setting />
                  </div>
                </div>
              )}
              {/* SideBar, 사실상 NavBar */}
              <SideBar
                current={sub}
                list={main === 'manage' ? manageNavList : settingNavList}
                handleChangeCurrent={src => handleNavigate(main, src)}
              />
            </>
          )}
        </div>

        {/* TODO: 가게마감 핸들러 작성 필요 */}
        {sub && main === 'manage' && (
          <>
            <Button
              title="가게마감"
              type="menu"
              state="normal"
              onClick={() => {
                socket.disconnect();
              }}
            />
          </>
        )}
        {sub && main === 'setting' && (
          <Button title="테이블로 이동" type="menu" state="normal" onClick={handleSaveSetting} />
        )}
      </aside>
      <main className="w-[75%] rounded-r-[30px] bg-d10">
        <Outlet />
      </main>
    </div>
  );
}
