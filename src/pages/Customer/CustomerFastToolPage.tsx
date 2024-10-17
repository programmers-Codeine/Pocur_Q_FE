import { Bell } from '@/assets/icons';
import IconButton from '@/components/customer/IconButton';
import NavHeader from '@/components/customer/NavHeader';
import useSocketStore from '@/stores/useCustomerSocketStore';

const fastToolList = ['직원 호출', '영수증', '자리 이동'];

export default function CustomerFastToolPage() {
  const { socket } = useSocketStore();

  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <NavHeader>빠른 호출</NavHeader>
      {/* 주문 버튼 */}
      {fastToolList.map(title => (
        <div key={title} className="self-center py-2">
          <IconButton
            title={title}
            onClick={() => {
              // TODO 각 핸들러 구현
              if (socket.connected) {
                socket.emit('placeCallRequest', {
                  callName: '수저 세트',
                  tableNum: 1,
                });
              } else {
                // TODO 소켓 미연결 시 소비자에게 QR 재접속 요청
              }
            }}
          >
            <Bell />
          </IconButton>
        </div>
      ))}
    </div>
  );
}
