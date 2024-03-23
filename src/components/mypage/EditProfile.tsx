import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { colors } from '@/app/styles/colors';
import { Input, Modal, Radio, Upload, Button, Avatar } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import Avatars from '../shared/Avatar';

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 3.2rem;
`;

const FlexContainer = styled.div`
  margin: 1.7rem 0 1.7rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
`;

const AvatarContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Sector = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 2rem;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid ${colors.Grayscale[13]};
`;

const Label = styled.p`
  color: ${colors.Grayscale[13]};
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 2rem;
`;

const inputStyle = {
  color: colors.Grayscale[13],
  fontSize: '1.6rem',
  fontWeight: 400,
  lineHeight: '3rem',
  borderRadius: 0,
  padding: 0,
};

interface ModalProps {
  defaultProfileImg: any;
  defaultNickname: string | any;
  defaultDescription: string | undefined;
  defaultAge: any; //number;
  defaultRegion: any; //number;
  confirmFunc?: () => void;
  modalOpenState: boolean;
  setter: (value: boolean) => void;
}
export default function EditProfile({
  defaultProfileImg,
  defaultNickname,
  defaultDescription,
  defaultAge,
  defaultRegion,
  modalOpenState,
  setter,
  confirmFunc,
}: ModalProps) {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState(0);
  const [region, setRegion] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [profileImg, setProfileImg] = useState(
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  );
  const { TextArea } = Input;

  const handleAgeChange = (e: RadioChangeEvent) => {
    setAge(e.target.value);
  };

  const handleRegionChange = (e: RadioChangeEvent) => {
    setRegion(e.target.value);
  };

  const onOkFunc = () => {
    if (confirmFunc !== undefined) {
      confirmFunc();
    }
    setter(false);
  };

  const onCancelFunc = () => {
    setter(false);
  };

  const handleFileChange = ({ fileList }) => {
    console.log('Uploaded files:', fileList);
    setFileList(fileList);
  };

  // const handleUpload = () => {
  //   const formData = new FormData();
  //   fileList.forEach((file) => {
  //     formData.append('files', file.originFileObj);
  //   });
  //   axios
  //     .post('your_upload_endpoint', formData)
  //     .then((response) => {
  //       console.log('Upload successful:', response);

  //     })
  //     .catch((error) => {
  //       console.error('Error uploading:', error);

  //     });
  // };

  useEffect(() => {
    setNickname(defaultNickname);
    setAge(defaultAge);
    setRegion(defaultRegion);
  }, [defaultProfileImg, defaultNickname, defaultAge, defaultRegion]);
  console.log(fileList);
  return (
    <Modal
      width={416}
      closable={false}
      open={modalOpenState}
      onOk={onOkFunc}
      onCancel={onCancelFunc}
      title={<Title>프로필 수정하기</Title>}
      cancelText="취소하기"
      okText="수정하기"
    >
      <FlexContainer>
        <Sector>
          <AvatarContainer>
            <Upload
              listType="picture-circle"
              maxCount={1}
              onChange={handleFileChange}
              fileList={fileList}
              showUploadList={false}
              style={{ width: 'fit-content', height: 'fit-content' }}
            >
              <Avatars type="profile" img={profileImg} />
            </Upload>
          </AvatarContainer>
        </Sector>
        <Sector>
          <Label>닉네임</Label>
          <Input
            placeholder="닉네임"
            variant="borderless"
            style={inputStyle}
            defaultValue={nickname}
          />
        </Sector>
        <Sector>
          <Label>자기소개</Label>
          <TextArea
            placeholder="자기소개 "
            variant="borderless"
            rows={2}
            style={inputStyle}
            defaultValue={defaultDescription}
          />
        </Sector>
        <Sector>
          <Label>연령대</Label>
          <Radio.Group onChange={handleAgeChange} value={age}>
            <Radio value={1}>10대</Radio>
            <Radio value={2}>20대</Radio>
            <Radio value={3}>30대</Radio>
            <Radio value={4}>40대</Radio>
            <Radio value={5}>50대</Radio>
            <Radio value={6}>60대 이상</Radio>
          </Radio.Group>
        </Sector>
        <Sector>
          <Label>관심지역</Label>
          <Radio.Group onChange={handleRegionChange} value={region}>
            <Radio value={1}>서울</Radio>
            <Radio value={2}>경기도</Radio>
            <Radio value={3}>강원도</Radio>
            <Radio value={4}>충청북도</Radio>
            <Radio value={5}>충청남도</Radio>
            <Radio value={6}>전라북도</Radio>
            <Radio value={7}>전라남도</Radio>
            <Radio value={8}>경상북도</Radio>
            <Radio value={9}>경상남도</Radio>
            <Radio value={10}>제주도</Radio>
          </Radio.Group>
        </Sector>
      </FlexContainer>
    </Modal>
  );
}
