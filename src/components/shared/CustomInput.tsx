import { Input } from 'antd';
import type { InputProps } from 'antd';

interface CustomInputProps extends InputProps {}

export default function CustomInput(props: CustomInputProps) {
  return (
    <Input
      {...props}
      style={{
        borderRadius: '3px',
        padding: '1.2rem 2.5rem',
      }}
    />
  );
}
