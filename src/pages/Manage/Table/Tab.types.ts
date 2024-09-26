export interface TabProps {
  id: string;
  index: number;
  currentTab: string;
  handleTabChange: (id: string) => void;
}
