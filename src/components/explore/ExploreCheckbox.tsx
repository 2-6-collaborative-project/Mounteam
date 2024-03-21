import { useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Checkbox, Collapse } from 'antd';

export default function ExploreCheckbox({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const checkAll = checkedList.length === options.length;

  const handleCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? options : []);
  };

  const handleChange = (option: string) => {
    const currentIndex = checkedList.indexOf(option);
    const newCheckedList = [...checkedList];

    if (currentIndex === -1) {
      newCheckedList.push(option);
    } else {
      newCheckedList.splice(currentIndex, 1);
    }

    setCheckedList(newCheckedList);
  };

  return (
    <Collapse
      ghost={true}
      expandIconPosition="end"
      defaultActiveKey={['1']}
      style={{
        paddingBottom: '1.17rem',
        fontSize: '1.3rem',
        fontWeight: '700',
        lineHeight: '3.2rem',
        borderRadius: '0',
      }}
      items={[
        {
          key: '1',
          label,
          children: (
            <>
              <Checkbox onChange={handleCheckAllChange} checked={checkAll}>
                전체 선택
              </Checkbox>
              {options.map((option) => (
                <Checkbox
                  key={option}
                  onChange={() => handleChange(option)}
                  checked={checkedList.includes(option)}
                >
                  {option}
                </Checkbox>
              ))}
            </>
          ),
        },
      ]}
    />
  );
}
