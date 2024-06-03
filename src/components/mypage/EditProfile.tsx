import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Input, Modal, Popover, Radio, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps, RadioChangeEvent } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { colors } from '@/app/styles/colors';
import Avatars from '@/src/components/shared/Avatar';
import { postUserData } from './api/postUserData';
import type { NextRouter } from 'next/router';
import { useRouter } from 'next/navigation';

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
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CameraIcon = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 1rem;
  align-items: flex-start;
  gap: 1rem;
  border-radius: 2.8rem;
  border: 1px solid var(--MDS-GrayScale-6, #bfbfbf);
  background: #fff;
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

const PopoverText = styled.p`
  color: ${colors.Grayscale[13]};
  font-size: '1.6rem';
  font-weight: 400;
  line-height: '3rem';
  &:hover {
    color: ${colors.Primary[400]};
  }
`;

const inputStyle = {
  color: colors.Grayscale[13],
  fontSize: '1.6rem',
  fontWeight: 400,
  lineHeight: '3rem',
  borderRadius: 0,
  padding: 0,
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type ProfileImg = null | string;
interface ModalProps {
  defaultProfileImg: any;
  defaultNickname: string | any;
  defaultDescription: string | any;
  defaultAge: any;
  defaultRegion: any;
  modalOpenState: boolean;
  setter: (value: boolean) => void;
  refetch: () => void;
}

export default function EditProfile({
  defaultProfileImg,
  defaultNickname,
  defaultDescription,
  defaultAge,
  defaultRegion,
  modalOpenState,
  setter,
  refetch,
}: ModalProps) {
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState(0);
  const [region, setRegion] = useState(0);
  const [fileList, setFileList] = useState<any>([]);
  const [profileImg, setProfileImg] = useState<ProfileImg>(null);
  const { TextArea } = Input;
  const router = useRouter();

  const handleNicknameChange = (e: any) => {
    setNickname(e.target.value);
  };
  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };
  const handleAgeChange = (e: RadioChangeEvent) => {
    setAge(e.target.value);
  };

  const handleRegionChange = (e: RadioChangeEvent) => {
    setRegion(e.target.value);
  };

  const handlePostData = async () => {
    const userData = {
      nickname: nickname,
      introduction: description,
      ageRange: age,
      areaInterest: region,
    };

    const jsonUserData = JSON.stringify(userData);
    const userDataPostData = new Blob([jsonUserData]);
    const formData = new FormData();

    formData.append('request', userDataPostData);
    formData.append('imgUrl', fileList[0].originFileObj);
    // if (fileList.length !== 0) {
    //   formData.append('imageUrl', fileList[0].originFileObj);
    // }

    await postUserData(formData);
  };

  const onOkFunc = async () => {
    await handlePostData();
    refetch();
    setter(false);
  };

  const onCancelFunc = () => {
    setNickname(defaultNickname);
    setDescription(defaultDescription);
    setAge(defaultAge);
    setRegion(defaultRegion);
    setProfileImg(defaultProfileImg);
    setter(false);
  };

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
  };

  const handleFileChange = async ({ fileList }: any) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      const file = fileList[0];
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
      }
      setProfileImg(file.preview);
    }
    setFileList(fileList);
  };

  useEffect(() => {
    if (fileList.length > 0) {
    }
  }, [fileList]);

  useEffect(() => {
    setNickname(defaultNickname);
    setDescription(defaultDescription);
    setAge(defaultAge);
    setRegion(defaultRegion);
    setProfileImg(defaultProfileImg);
  }, [
    defaultProfileImg,
    defaultNickname,
    defaultAge,
    defaultRegion,
    defaultDescription,
  ]);

  console.table([
    {
      nickname: nickname,
      description: description,
      age: age,
      region: region,
      profileImg: profileImg,
    },
  ]);
  const popoverContent = (
    <PopoverText onClick={() => setProfileImg('')}>아바타 제거</PopoverText>
  );
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
            {profileImg ? (
              <Popover content={popoverContent}>
                <Avatars type="profile" img={profileImg} />
                <Upload
                  maxCount={1}
                  onPreview={handlePreview}
                  onChange={handleFileChange}
                  fileList={fileList}
                  showUploadList={false}
                  style={{ width: 'fit-content', height: 'fit-content' }}
                >
                  <CameraIcon>
                    <Image
                      src={'/Camera.svg'}
                      alt="이미지업로드"
                      width="36"
                      height="36"
                    />
                  </CameraIcon>
                </Upload>
              </Popover>
            ) : (
              <>
                <Avatars type="profile" img={profileImg} />
                <Upload
                  maxCount={1}
                  onPreview={handlePreview}
                  onChange={handleFileChange}
                  fileList={fileList}
                  showUploadList={false}
                  style={{ width: 'fit-content', height: 'fit-content' }}
                >
                  <CameraIcon>
                    <Image
                      src={'/Camera.svg'}
                      alt="이미지업로드"
                      width="36"
                      height="36"
                    />
                  </CameraIcon>
                </Upload>
              </>
            )}
          </AvatarContainer>
        </Sector>
        <Sector>
          <Label>닉네임</Label>
          <Input
            placeholder="닉네임"
            variant="borderless"
            style={inputStyle}
            defaultValue={defaultNickname}
            value={nickname}
            onChange={handleNicknameChange}
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
            value={description}
            onChange={handleDescriptionChange}
          />
        </Sector>
        <Sector>
          <Label>연령대</Label>
          <Radio.Group onChange={handleAgeChange} value={age}>
            <Radio value={'teenager'}>10대</Radio>
            <Radio value={'twenties'}>20대</Radio>
            <Radio value={'thirties'}>30대</Radio>
            <Radio value={'fourties'}>40대</Radio>
            <Radio value={'fifties'}>50대</Radio>
            <Radio value={'sixties'}>60대 이상</Radio>
          </Radio.Group>
        </Sector>
        <Sector>
          <Label>관심지역</Label>
          <Radio.Group onChange={handleRegionChange} value={region}>
            <Radio value={'서울'}>서울</Radio>
            <Radio value={'경기도'}>경기도</Radio>
            <Radio value={'강원도'}>강원도</Radio>
            <Radio value={'충청북도'}>충청북도</Radio>
            <Radio value={'충청남도'}>충청남도</Radio>
            <Radio value={'전라북도'}>전라북도</Radio>
            <Radio value={'전라남도'}>전라남도</Radio>
            <Radio value={'경상북도'}>경상북도</Radio>z
            <Radio value={'경상남도'}>경상남도</Radio>
            <Radio value={'제주도'}>제주도</Radio>
          </Radio.Group>
        </Sector>
      </FlexContainer>
    </Modal>
  );
}

// {
//   request: {
//     nickname: nickname,
//     introduction: description,
//     ageRange: age,
//     areaInterest: region,
//   },
//   imgUrl:
//     'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
// }

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
