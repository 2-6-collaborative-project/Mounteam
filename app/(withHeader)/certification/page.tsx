'use client';

import { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Form, DatePicker, Checkbox, ConfigProvider, Tag } from 'antd';
import ko from 'antd/es/date-picker/locale/ko_KR';
import 'dayjs/locale/zh-cn';
import Buttons from '@/src/components/review/write/Buttons';
import Tab from '@/src/components/shared/Tab';
import ImgUpload from '@/src/components/review/write/ImgUpload';
import AutoSearchBar from '@/src/components/shared/AutoSearchBar';
import useCertificationStore from '@/src/store/useCertificationStore';

const TabContainer = styled.div`
  margin-bottom: 8rem;
`;

const ContentContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-bottom: 20rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rem;
  @media (max-width: 768px) {
    width: 70%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const FlexContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const CheckBoxText = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
`;

const formStyle: React.CSSProperties = {
  width: '100%',
  fontSize: '1.6rem',
  fontWeight: '700',
  lineHeight: '3.2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5rem',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '6.6rem',
  padding: '1.2rem 6.2rem 1.2rem 2.5rem',

  fontSize: ' 1.6rem',
  fontWeight: 400,
  lineHeight: '2.4rem',
};

export default function Certification() {
  const { fileList, setFileList, place, setPlace, date, setDate } =
    useCertificationStore();
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (fileList[0]?.lastModifiedDate !== undefined) {
      const imgDate = fileList[0]?.lastModifiedDate;
      const dateFormat =
        imgDate.getFullYear() +
        '년 ' +
        (imgDate.getMonth() + 1) +
        '월 ' +
        imgDate.getDate() +
        '일 ';
      setDate(dateFormat);
    }
  }, [fileList, date]);

  useEffect(() => {
    const hasFiles = fileList.length > 0;
    const isPlaced = /^.+$/.test(place);
    const isDated = /^.+$/.test(date);

    if (hasFiles && isPlaced && isDated && isChecked === true) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [date, place, fileList, isChecked]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <TabContainer>
          <Tab variant="explores" />
        </TabContainer>
        <ContentContainer>
          <Form layout="vertical" style={formStyle}>
            <Form.Item style={{ width: '100%', marginBottom: '0' }}>
              <AutoSearchBar type="create" setSearchedMountain={setPlace} />
            </Form.Item>
            <Form.Item
              label="이미지 업로드"
              style={{ width: '100%', marginBottom: '0' }}
            >
              <ImgUpload
                maxItem={1}
                fileList={fileList}
                setFileList={setFileList}
              />
            </Form.Item>
            <Form.Item
              label="장소"
              style={{ width: '100%', marginBottom: '0' }}
            >
              <Input
                placeholder={place}
                variant="filled"
                style={inputStyle}
                disabled
              ></Input>
            </Form.Item>
            <Form.Item
              label="날짜"
              style={{ width: '100%', marginBottom: '0' }}
            >
              <Input
                placeholder={date}
                variant="filled"
                style={inputStyle}
                disabled
              ></Input>
            </Form.Item>
          </Form>
          <FlexContainer>
            <Checkbox onChange={handleChecked}>
              <CheckBoxText>위치정보, 날짜정보 사용에 동의합니다.</CheckBoxText>
            </Checkbox>
            <Buttons width="100%" height="6.6rem" disabled={isButtonDisabled}>
              인증하기
            </Buttons>
          </FlexContainer>
        </ContentContainer>
      </Suspense>
    </>
  );
}
