import { getCustomerToken } from '@/apis/customer.api';
import { getCurrentDesignPreset } from '@/apis/setting/design.api';
import useCustomerStore from '@/stores/useCustomerStore';
import useThemeStore from '@/stores/useThemeStore';
import useSocketStore from '@/stores/useCustomerSocketStore';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCustomerTableNo } = useCustomerStore();
  const { setTheme, theme } = useThemeStore();
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
    getCurrentDesignPreset().then(designPresets => {
      setTheme({
        all: {
          background: designPresets.background,
          largeText: designPresets.bigText,
          smallText: designPresets.smallText,
          box: designPresets.box,
          boxOutline: designPresets.boxBorder,
          icon: designPresets.icon,
        },
        button: {
          normal: {
            background: designPresets.buttonBackground,
            textAndIcon: designPresets.buttonText,
            outline: designPresets.buttonBorder,
          },
          active: {
            background: designPresets.buttonActiveBackground,
            textAndIcon: designPresets.buttonActiveText,
            outline: designPresets.buttonActiveBorder,
          },
        },
        addOption: {
          label: {
            hot: designPresets.labelHot,
            new: designPresets.labelNew,
            soldOut: designPresets.labelSoldOut,
          },
        },
      });
    });
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-around bg-b50">
      <div className="lg:text-lg lg:font-bold lg:text-gray-700 max-[1024px]:hidden">
        Customer Page in DeskTop
      </div>

      <div
        className="h-full w-full border border-d10 bg-d10 shadow-lg customer:w-[430px]"
        style={{ backgroundColor: theme.all.background }}
      >
        <Outlet />
      </div>
    </div>
  );
}
