type List = {
  id: number;
  name: string;
};

export type ContextOptionsProps = {
  options: List[];
  onClick: (id: number) => void;
};
