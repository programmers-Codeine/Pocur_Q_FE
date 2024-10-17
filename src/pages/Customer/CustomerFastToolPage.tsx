import { Bell } from '@/assets/icons';
import IconButton from '@/components/customer/IconButton';
import NavHeader from '@/components/customer/NavHeader';
import useThemeStore from '@/stores/useThemeStore';

const fastToolList = ['직원 호출', '영수증', '자리 이동'];

export default function CustomerFastToolPage() {
  const { theme } = useThemeStore();
  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <NavHeader theme={theme}>빠른 호출</NavHeader>
      {/* 주문 버튼 */}
      {fastToolList.map(title => (
        <div key={title} className="self-center py-2">
          <IconButton
            title={title}
            theme={theme}
            onClick={() => {
              // TODO 각 핸들러 구현
            }}
          >
            <Bell style={{ fill: theme.button.active.textAndIcon }} />
          </IconButton>
        </div>
      ))}
    </div>
  );
}
