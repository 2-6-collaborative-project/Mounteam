import { useEffect, useState } from 'react';
import type { DatePickerProps, TimePickerProps } from 'antd';
import { DatePicker, TimePicker } from 'antd';
import TeamCreationForm from '@/src/types/teams/create/teamCreation';

export default function TeamDatePicker({
  handleTeamCreationForm,
}: {
  handleTeamCreationForm: (key: keyof TeamCreationForm, value: string) => void;
}) {
  const [departureDay, setDepartureDay] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const onChangeDate: DatePickerProps['onChange'] = (_, dateString) => {
    if (typeof dateString === 'string') {
      setDate(dateString);
    }
  };

  const onChangeTime: TimePickerProps['onChange'] = (_, timeString) => {
    if (typeof timeString === 'string') {
      setTime(timeString);
    }
  };

  useEffect(() => {
    setDepartureDay(date + ' ' + time);
  }, [date, time]);

  useEffect(() => {
    handleTeamCreationForm('departureDay', departureDay);
  }, [departureDay, handleTeamCreationForm]);

  return (
    <>
      <DatePicker
        onChange={onChangeDate}
        placeholder="날짜 선택"
        style={{
          width: '100%',
          padding: '1.2rem 2.1rem',
          borderRadius: '3px',
        }}
      />

      <TimePicker
        onChange={onChangeTime}
        format={'HH:mm'}
        placeholder="시간 선택"
        style={{
          width: '100%',
          padding: '1.2rem 2.1rem',
          borderRadius: '3px',
        }}
      />
    </>
  );
}
