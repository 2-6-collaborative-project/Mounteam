import { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio, Space } from 'antd';

export default function CourseRadio() {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={1}>추후에 팀원들과 함께 결정할게요.</Radio>
        <Radio value={2}>지금 결정할게요.</Radio>
      </Space>
    </Radio.Group>
  );
}
