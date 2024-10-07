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
  options: AddOptionsTypes[] | null;
  optionsInput: AddOptionsTypes[];
};

export type UserFormTypes = {
  email: string;
  password: string;
};

export interface InputField {
  id: keyof UserFormTypes;
  label: string;
  type: string;
  placeholder: string;
}