export type TStepProps = {
  className?: string;
  options?: TStepData[];
  value?: TStepData;
  showSingle?: boolean;
  justify?:
    | 'space-between'
    | 'start'
    | 'end'
    | 'center'
    | 'space-around'
    | 'space-evenly';
  onChange?: (data: TStepData) => void;
};

export type TStepData = {
  key: number;
  label: string;
  value: string;
};
