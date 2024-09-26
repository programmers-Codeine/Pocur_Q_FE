import { Outlet } from 'react-router-dom';

export default function ManageLayout() {
  // TODO: 첫 사용자인지(가게가 있는지) 체크
  // TODO: 사용자가 리로드했을 때 => 로컬 스토리지

  // TODO 첫 사용자라면, 가게 생성 작성
  // TODO 첫 사용자가 아니라면, /table 로 이동
  // TODO 사용자가 아니라면 / 로 이동
  return <Outlet />;
}
