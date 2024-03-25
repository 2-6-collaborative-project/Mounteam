import { colors } from '@/app/styles/colors';
import { Button } from 'antd';
import { useState } from 'react';

interface ButtonsProps {
  children: string;
  disabled: boolean;
}
export default function Buttons({ children, disabled }: ButtonsProps) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    width: '48.4rem',
    height: '6.6rem',
    color: disabled ? colors.Grayscale[6] : colors.Grayscale[1],
    fontSize: '2.4rem',
    fontWeight: '600',
    borderRadius: '0.3rem',
    background: isHovered
      ? colors.Primary[400]
      : disabled
        ? colors.Grayscale[4]
        : colors.Primary[500],
  };

  const hoverStyle = {
    background: colors.Primary[400],
  };

  return (
    <Button
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
