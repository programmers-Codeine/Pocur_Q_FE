import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerHomePage() {
  const navigate = useNavigate();

  // TODO 클릭 시 화면 이동으로 변경하기
  useEffect(() => {
    setTimeout(() => navigate('/customer/menu'), 500);
  }, []);

  return <div>CustomerHomePage</div>;
}
