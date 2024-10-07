export interface TabProps {
  id: string;
  /*
    탭 길이가 고정된 160px에 대한 absolute left 값
    탭 길이가 변경되는 경우 수정이 필요한 값
  */
  leftPosition: string;
  currentTab: string;
  handleTabChange: (id: string) => void;
}
