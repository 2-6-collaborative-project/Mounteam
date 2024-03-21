import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimePicker } from 'antd';

dayjs.extend(customParseFormat);

const format = 'HH:mm';

const onChange = (date: Dayjs, dateString: string | string[]) => {
  console.log(date, dateString);
};

export default function TeamTimePicker() {
  return (
    <TimePicker
      onChange={onChange}
      format={format}
      placeholder="시간 선택"
      style={{
        width: '100%',
        padding: '1.2rem 2.1rem',
        borderRadius: '3px',
      }}
    />
  );
}
