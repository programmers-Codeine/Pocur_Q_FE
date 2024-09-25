type UserInfoFormTypes = {
  nickname?: string;
};

export type UserLoginFormTypes = {
  email: string;
  password: string;
};

export type RegisterUserFormTypes = UserLoginFormTypes & UserInfoFormTypes;

export interface InputField {
  id: keyof RegisterUserFormTypes;
  label: string;
  type: string;
  placeholder: string;
}
