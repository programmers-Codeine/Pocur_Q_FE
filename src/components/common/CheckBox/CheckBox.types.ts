export type CheckBoxProps = {
  id: string;
  label: string;
  checked: boolean;
  isBold: boolean;
  onChange: (id: string) => void;
};
