export type UserType = {
  id: string | null;
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

type DesignThemeTypes = {
  all: {
    background: string;
    largeText: string;
    smallText: string;
    box: string;
    boxOutline: string;
    icon: string;
  };
  button: {
    normal: {
      background: string;
      textAndIcon: string;
      outline: string;
    };
    active: {
      background: string;
      textAndIcon: string;
      outline: string;
    };
  };
  addOption: {
    label: {
      hot: string;
      new: string;
      soldOut: string;
    };
  };
};

export type InputDesignFormTypes = {
  designName: string;
  designImage: string;
  theme: DesignThemeTypes;
};

export type InputEtcFormTypes = {
  tableCount: number;
  shopName: string;
  shopLogo: string;
  comment: {
    introduce: string;
    success: string;
  };
  tools: {
    prepayment: boolean;
  };
};
