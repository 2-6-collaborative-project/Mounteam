import { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import styled from 'styled-components';

const { RangePicker } = DatePicker;

interface DateFilterProps {
  handleDateChange: (dateRange: [string, string]) => void;
}

const DateContainer = styled.div`
  .ant-picker-input {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.25rem;
    color: var(--character-disabled-placeholder-25, rgba(0, 0, 0, 0.25));
  }
`;

export default function DateFilter({ handleDateChange }: DateFilterProps) {
  const [dateRange, setDateRange] = useState<[string, string]>(['', '']);

  const onChangeDate = (_: any, dateString: [string, string]) => {
    const formattedDateRange = dateString.map((date) => {
      return date
        ? `${date.substring(0, 2) + 2000}-${date.substring(3, 5)}-${date.substring(6, 8)}`
        : '';
    }) as [string, string];

    setDateRange(formattedDateRange);
  };

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      handleDateChange(dateRange);
    }
  }, [dateRange, handleDateChange]);

  return (
    <DateContainer>
      <RangePicker
        onChange={onChangeDate}
        format="YY.MM.DD"
        placeholder={['시작 날짜', '종료 날짜']}
        style={{
          width: '100%',
          padding: '0.25rem 0.75rem',
        }}
      />
    </DateContainer>
  );
}
