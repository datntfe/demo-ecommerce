import React from 'react';

interface InputCustomProps {
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  className?: string;
  styles?: { [k: string]: string };
  error?: boolean;
  value?: string;
  name?: string;
  message?: string | false;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
}
const InputCustom: React.FC<InputCustomProps> = ({
  placeholder,
  onChange,
  type,
  className,
  styles,
  error,
  value,
  name,
  message,
  disabled,
  maxLength,
  minLength,
}) => (
  <div>
    <input
      className={`border input-text ${className} ${error ? 'error-input' : ''}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      style={styles}
      value={value}
      name={name}
      disabled={disabled}
      maxLength={maxLength}
      minLength={minLength}
    />
    {message && error && <div className="text-red mt-2 font-size12">{message}</div>}
  </div>
);

export default InputCustom;
