export type UserType = {
  id: string | string | null;
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
  id: string;
  optionName: string;
  price: string;
};

export type InputMenuFormTypes = {
  category: string;
  search: string;
  menuName: string;
  description: string;
  menuCategory: string;
  price: string;
  origin: string;
  options: AddOptionsTypes[] | string | null;
  image: string;
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

export type SetDesignPresetData = {
  id: string;
  name: string;
};

export type SetDesignData = {
  id?: string;
  name: string;
  background: string | null;
  bigText: string | null;
  smallText: string | null;
  box: string | null;
  boxBorder: string | null;
  icon: string | null;
  buttonBackground: string | null;
  buttonText: string | null;
  buttonBorder: string | null;
  buttonActiveBackground: string | null;
  buttonActiveText: string | null;
  buttonActiveBorder: string | null;
  labelHot: string | null;
  labelNew: string | null;
  labelSoloOut: string | null;
};

// designName: '',
//     designImage: '',
//     theme: {
//       all: {
//         background: '#ffffff',
//         largeText: '#ffffff',
//         smallText: '#ffffff',
//         box: '#ffffff',
//         boxOutline: '#ffffff',
//         icon: '#ffffff',
//       },
//       button: {
//         normal: {
//           background: '#ffffff',
//           textAndIcon: '#ffffff',
//           outline: '#ffffff',
//         },
//         active: {
//           background: '#ffffff',
//           textAndIcon: '#ffffff',
//           outline: '#ffffff',
//         },
//       },
//       addOption: {
//         label: {
//           hot: '#ffffff',
//           new: '#ffffff',
//           soldOut: '#ffffff',
//         },
//       },
//     },

export type SetMenuData = {
  id?: string;
  categoryId: string;
  menuName: string;
  price: number;
  menuDetail: string;
  menuImg: string;
  origin: string | null;
  options?: SetOptionsData[];
  isActive?: boolean;
};

export type SetOptionsData = {
  id?: string;
  optionName: string;
  optionPrice: number;
};
