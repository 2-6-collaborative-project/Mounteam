import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';

const { TextArea } = Input;

interface CustomTextAreaProps extends TextAreaProps {}

export default function CustomTextArea(props: CustomTextAreaProps) {
  return (
    <TextArea
      {...props}
      style={{
        borderRadius: '3px',
        padding: '1.2rem 2.5rem;',
      }}
    />
  );
}
