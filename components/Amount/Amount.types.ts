export type TAmountProps = {
  className?: string;
  value?: number;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
};
