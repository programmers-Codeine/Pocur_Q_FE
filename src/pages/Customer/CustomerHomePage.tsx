import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Logo } from '@/assets/icons';
import useThemeStore from '@/stores/useThemeStore';
import useCustomerStore from '@/stores/useCustomerStore';
import { getRestaurantData } from '@/apis/customer.api';

export default function CustomerHomePage() {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const { setRestaurantInfo, restaurantInfo } = useCustomerStore();

  useEffect(() => {
    getRestaurantData().then(res =>
      setRestaurantInfo({
        name: res.name,
        introduce: res.introduce,
        logo: res.logo,
      })
    );
  }, []);

  return (
    <div
      className="relative flex h-full flex-col items-center justify-center gap-3"
      onClick={() => navigate('/customer/menu')}
    >
      {restaurantInfo?.logo ? (
        <img src={restaurantInfo.logo} className="w-[50%]" />
      ) : (
        <Spinner fill={theme.all.icon} className="animate-spin" />
      )}

      <p className="text-2xl" style={{ color: theme.all.largeText }}>
        {restaurantInfo?.name}
      </p>
      <div className="text-base" style={{ color: theme.all.smallText }}>
        <p>{restaurantInfo?.introduce}</p>
      </div>
      <Logo className="absolute bottom-6" fill={theme.all.icon} />
    </div>
  );
}
