'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Input, Form, DatePicker, Checkbox, Tag } from 'antd';
import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';
import ko from 'antd/es/date-picker/locale/ko_KR';
import 'dayjs/locale/zh-cn';
import Tags from '@/src/components/review/write/Tag';
import Buttons from '@/src/components/review/write/Buttons';
import Tab from '@/src/components/shared/Tab';
import useReviewWriteStore from '@/src/store/useReviewWriteStore';
import ImgUpload from '@/src/components/review/write/ImgUpload';
import AutoSearchBar from '@/src/components/shared/AutoSearchBar';
import { colors } from '@/app/styles/colors';
import TeamsSearchBar from '@/src/components/teams/write/TeamsSearchBar';
import { getTeamsData } from '@/src/components/teams/write/api/getTeamsData';
import { useTeamsWriteStore } from '@/src/store/useTeamsWriteStore';

const TabContainer = styled.div`
  margin-bottom: 3rem;
`;

const MainTitle = styled.p`
  margin-bottom: 8rem;

  color: ${colors.Grayscale[13]};
  font-size: 3rem;
  font-weight: 600;
  line-height: 4.2rem;
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

const tagStyle: React.CSSProperties = {
  width: 'auto',
  height: '3.8rem',
  padding: '0.9rem  1.5rem 0.9rem  1.5rem',
  textAlign: 'center',
  position: 'absolute',
  top: '4rem',
  background: colors.Primary[50],
  color: colors.Primary[500],
  marginInlineEnd: 8,
  verticalAlign: 'top',
  borderRadius: '0.3rem',
  border: `1px solid ${colors.Primary[500]}`,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: '6.6rem',
  padding: '1.2rem 6.2rem 1.2rem 2.5rem',

  fontSize: ' 1.6rem',
  fontWeight: 400,
  lineHeight: '2.4rem',
};

export default function TeamsWrite() {
  const {
    fileList,
    setFileList,
    description,
    setDescription,
    place,
    date,
    tags,
    setTags,
    searchResult,
  } = useTeamsWriteStore();
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { TextArea } = Input;

  const { data: teamsList } = useQuery({
    queryKey: ['teamsList'],
    queryFn: () => getTeamsData(),
  });

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(event.currentTarget.value);
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const isPlaced = /^.+$/.test(place);
    const isDated = /^.+$/.test(date);
    const isDescription = /^.+$/.test(description);
    const isImg = fileList.length > 0;
    if (isPlaced && isDated && isDescription && isChecked && isImg) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [date, place, description, isChecked, fileList]);

  return (
    <>
      <TabContainer>
        <Tab variant="explores" />
      </TabContainer>
      <MainTitle>모임 후기 작성하기</MainTitle>
      <ContentContainer>
        <Form
          layout="vertical"
          style={{
            width: '100%',
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
            label="장소"
            style={{ width: '100%', marginBottom: '0', position: 'relative' }}
          >
            <TeamsSearchBar teamsList={teamsList} />
            {searchResult !== '' ? (
              <Tag style={tagStyle}>{searchResult}</Tag>
            ) : (
              ''
            )}
          </Form.Item>
          <Form.Item label="내용" style={{ width: '100%', marginBottom: '0' }}>
            <TextArea
              rows={3}
              placeholder="내용을 적어주세요"
              style={{ width: '100%' }}
              onChange={handleTextAreaChange}
            />
          </Form.Item>
          <Form.Item
            label="이미지 업로드"
            style={{ width: '100%', marginBottom: '0' }}
          >
            <ImgUpload
              maxItem={5}
              fileList={fileList}
              setFileList={setFileList}
            />
          </Form.Item>
          <Form.Item
            label="장소"
            style={{ width: '100%', marginBottom: '0', position: 'relative' }}
          >
            <Input
              placeholder={place}
              variant="filled"
              style={inputStyle}
              disabled
            ></Input>
          </Form.Item>
          <Form.Item label="날짜" style={{ width: '100%', marginBottom: '0' }}>
            <Input
              placeholder={place}
              variant="filled"
              style={inputStyle}
              disabled
            ></Input>
          </Form.Item>
          <Form.Item label="태그" style={{ width: '100%', marginBottom: '0' }}>
            <Tags tags={tags} setTags={setTags} />
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
    </>
  );
}
