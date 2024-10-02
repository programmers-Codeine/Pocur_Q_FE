export type UserType = {
  id: string | null;
};

export type AddOptionsTypes = {
  id: number;
  optionName: string;
  price: string;
};

export type InputMenuFormTypes = {
  category: string;
  search: string;
  menuName: string;
  description: string;
  menuCategory: number;
  price: string;
  origin: string;
  options: { id: number; optionName: string; price: string }[] | null;
  optionsInput: { id: number; optionName: string; price: string }[];
};
