import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Checkbox, Modal } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { deleteMyTeam } from './api/deleteMyTeam';

const TitleContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
`;
const PaddingContainer = styled.div`
  padding-left: 2rem;
`;
const CheckBoxText = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
`;

interface ModalProps {
  modalOpenState: boolean;
  setter: (value: boolean) => void;
  id: number;
  refetch: () => void;
}
export default function TeamCancelModal({
  modalOpenState,
  setter,
  id,
  refetch,
}: ModalProps) {
  const [isOKDisabled, setIsOKDisabled] = useState(true);

  const handleOkButtonDisabled = () => {
    setIsOKDisabled(!isOKDisabled);
  };

  const onOkFunc = async () => {
    await deleteMyTeam(id);
    refetch();
    setter(false);
  };

  const onCancelFunc = () => {
    setter(false);
  };

  return (
    <>
      <Modal
        width={416}
        title={
          <TitleContainer>
            <ExclamationCircleOutlined style={{ color: 'red' }} />
            <Title>{'정말 취소하시겠습니까?'}</Title>
          </TitleContainer>
        }
        open={modalOpenState}
        okText="확인"
        okButtonProps={{
          disabled: isOKDisabled,
        }}
        cancelText="취소"
        onOk={onOkFunc}
        onCancel={onCancelFunc}
        closable={false}
      >
        <br />
        <PaddingContainer>
          <Checkbox onChange={handleOkButtonDisabled}>
            <CheckBoxText>취소하겠습니다.</CheckBoxText>
          </Checkbox>
        </PaddingContainer>
      </Modal>
    </>
  );
}
