import { Bell } from '@/assets/icons';
import IconButton from '@/components/customer/IconButton';
import NavHeader from '@/components/customer/NavHeader';

const fastToolList = ['직원 호출', '영수증', '자리 이동'];

export default function CustomerFastToolPage() {
  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <NavHeader>빠른 호출</NavHeader>
      {/* 주문 버튼 */}
      {fastToolList.map(title => (
        <div className="self-center py-2">
          <IconButton
            title={title}
            onClick={() => {
              // TODO 각 핸들러 구현
            }}
          >
            <Bell />
          </IconButton>
        </div>
      ))}
    </div>
  );
}
