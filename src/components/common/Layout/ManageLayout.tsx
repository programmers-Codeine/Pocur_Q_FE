import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import FirstPage from '@/pages/Manage/Table/FirstPage';

export default function ManageLayout() {
  // TODO 첫 사용자라면, 가게 생성 작성
  // TODO 첫 사용자가 아니라면, /table 로 이동
  // TODO 사용자가 아니라면 / 로 이동
  
  /* TODO 처음을 알 수 있는 data 사용
    로그인 시 data를 받아와 localStorage에 저장 후 해당 페이지로 넘어올 때 localStorage에서 가져와서 사용
    중요한 정보가 아니기 때문에 localStorage에 저장해서 사용
  */
  // TODO: 사용자가 리로드했을 때 => 로컬 스토리지

  const [isFirstTime, setIsFirstTime] = useState(true);

  if (isFirstTime) return <FirstPage setIsFirstTime={setIsFirstTime} />;

  return <Outlet />;
}
