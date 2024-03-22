import { Button } from 'antd';
import type { ButtonProps } from 'antd';

interface CustomButtonProps extends ButtonProps {
  children: string;
}

export default function CustomButton(props: CustomButtonProps) {
  return (
    <Button
      {...props}
      style={{
        borderRadius: '3px',
        fontSize: '2.4rem',
        height: '5.6rem',
        padding: '1rem',
      }}
    >
      {props.children}
    </Button>
  );
}
