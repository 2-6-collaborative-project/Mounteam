'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Tab from '@/src/components/shared/Tab';
import { Input, Form, Upload, Modal, DatePicker, Checkbox, Button } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ko from 'antd/es/date-picker/locale/ko_KR';
import Tags from '@/src/components/review/write/Tag';
import { colors } from '@/app/styles/colors';
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

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function Review() {
  const [textValue, setTextValue] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const { TextArea } = Input;

  const buttonStyle = {
    width: '48.4rem',
    height: '6.6rem',
    color: colors.Grayscale[1],
    fontSize: '2.4rem',
    fontWeight: '600',
    borderRadius: '0.3rem',
    background: isButtonDisabled ? colors.Primary[200] : colors.Primary[500],
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextValue(event.currentTarget.value);
  };

  const handleChecked = () => {
    setIsButtonDisabled(!isButtonDisabled);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleUploadChange: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
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
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleUploadChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              footer={null}
              onCancel={handleCancel}
              closeIcon={false}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
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
          <Checkbox style={{}} onChange={handleChecked}>
            <CheckBoxText>위치정보, 날짜정보 사용에 동의합니다.</CheckBoxText>
          </Checkbox>
          <Button style={buttonStyle} disabled={isButtonDisabled}>
            인증하기
          </Button>
        </FlexContainer>
      </ContentContainer>
    </>
  );
}
