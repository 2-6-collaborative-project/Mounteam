'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Input, Form, DatePicker, Checkbox, ConfigProvider } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ko from 'antd/es/date-picker/locale/ko_KR';
import 'dayjs/locale/zh-cn';
import Tags from '@/src/components/review/write/Tag';
import Buttons from '@/src/components/review/write/Buttons';
import Tab from '@/src/components/shared/Tab';
import useReviewWriteStore from '@/src/store/useReviewWriteStore';
import ImgUpload from '@/src/components/review/write/ImgUpload';
import AutoSearchBar from '@/src/components/shared/AutoSearchBar';
const TabContainer = styled.div`
  margin-bottom: 8rem;
`;

const ContentContainer = styled.div`
  width: 100%;
  margin-bottom: 20rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rem;
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

export default function Review() {
  const {
    fileList,
    description,
    setDescription,
    place,
    setPlace,
    date,
    setDate,
    tags,
  } = useReviewWriteStore();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { TextArea } = Input;

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.currentTarget.value);
  };

  const handleChecked = () => {
    setIsButtonDisabled(!isButtonDisabled);
  };

  console.log(fileList);
  return (
    <>
      <TabContainer>
        <Tab variant="explores" />
      </TabContainer>
      <ContentContainer>
        <Form
          layout="vertical"
          style={{
            width: '48.4rem',
            fontSize: '1.6rem',
            fontWeight: '700',
            lineHeight: '3.2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5rem',
          }}
        >
          <Form.Item
            label="Field A"
            style={{ width: '100%', marginBottom: '0' }}
          >
            <TextArea
              rows={3}
              placeholder="나중에 수정하기"
              style={{ width: '100%' }}
              onChange={handleTextAreaChange}
            />
          </Form.Item>
          <Form.Item
            label="이미지 업로드"
            style={{ width: '100%', marginBottom: '0' }}
          >
            <ImgUpload />
          </Form.Item>
          <Form.Item label="장소" style={{ width: '100%', marginBottom: '0' }}>
            <AutoSearchBar />
          </Form.Item>
          <Form.Item label="날짜" style={{ width: '100%', marginBottom: '0' }}>
            <DatePicker
              placeholder="날짜 선택"
              style={{
                width: '100%',
                height: '6.6rem',
              }}
            />
          </Form.Item>
          <Form.Item label="태그" style={{ width: '100%', marginBottom: '0' }}>
            <Tags />
          </Form.Item>
        </Form>
        <FlexContainer>
          <Checkbox onChange={handleChecked}>
            <CheckBoxText>위치정보, 날짜정보 사용에 동의합니다.</CheckBoxText>
          </Checkbox>
          <Buttons disabled={isButtonDisabled}>인증하기</Buttons>
        </FlexContainer>
      </ContentContainer>
    </>
  );
}
