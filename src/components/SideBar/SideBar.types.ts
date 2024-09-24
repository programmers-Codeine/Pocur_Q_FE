type Item = {
  id: number;
  name: string;
  src: string;
};

export type SideBarProps = {
  current: string;
  list: Item[];
  handleChangeCurrent: (src: string) => void;
};
