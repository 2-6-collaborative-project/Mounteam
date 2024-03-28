import { Modal } from 'antd';
import styled from 'styled-components';
import { colors } from '@/app/styles/colors';
import ImgUpload from '../review/write/ImgUpload';
import TextArea from 'antd/es/input/TextArea';
import Tags from '../review/write/Tag';

interface ModalProps {
  feedId: number;
  modalOpenState: boolean;
  confirmFunc?: () => void;
  setter: (value: boolean) => void;
}

const Title = styled.p`
  color: ${colors.Grayscale[13]};

  font-size: 1.6rem;

  font-weight: 700;
  line-height: 3.2rem;
`;

const Sector = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 1rem;
  flex-direction: column;
  gap: 1.7rem;
  border-bottom: 1px solid ${colors.Grayscale[13]};
`;

const Label = styled.p`
  padding-top: 1rem;
  color: ${colors.Grayscale[13]};
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 2rem;
`;

export default function FeedModify({
  feedId,
  setter,
  modalOpenState,
  confirmFunc,
}: ModalProps) {
  const onOkFunc = () => {
    if (confirmFunc !== undefined) {
      confirmFunc();
    }
    setter(false);
  };

  const onCancelFunc = () => {
    setter(false);
  };

  return (
    <>
      <Modal
        width={600}
        closable={false}
        open={modalOpenState}
        onOk={onOkFunc}
        onCancel={onCancelFunc}
        title={<Title>피드 수정하기</Title>}
        cancelText="취소하기"
        okText="수정하기"
      >
        <Sector>
          <Label>이미지 수정</Label>
          <ImgUpload maxItem={5} />
        </Sector>
        <Sector>
          <Label>내용</Label>
          <TextArea />
        </Sector>
        <Sector>
          <Label>태그</Label>
          <Tags />
        </Sector>
      </Modal>
    </>
  );
}
