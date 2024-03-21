import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

export default function TeamDatePicker() {
  return (
    <DatePicker
      onChange={onChange}
      placeholder="날짜 선택"
      style={{
        width: '100%',
        padding: '1.2rem 2.1rem',
        borderRadius: '3px',
      }}
    />
  );
}
