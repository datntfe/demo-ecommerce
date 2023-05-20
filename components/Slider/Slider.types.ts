export type TSliderProps = {
  className?: string;
  range?: boolean;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: any) => void;
  value?: any;
};
