import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Checkbox, Modal } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TitleContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
`;

const CheckBoxText = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
`;

const Text = styled.p`
  padding-left: 3.2rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
`;

const TextBack = styled.p`
  padding-left: 3.2rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2rem;
`;

interface ModalProps {
  type: 'check' | 'copy' | 'back';
  confirmFunc?: () => void;
  copyLink?: string;
  modalOpenState: boolean;
  setter: (value: boolean) => void;
}
export default function Modals({
  type, //'check' | 'copy' | 'back'
  modalOpenState, // 모달창이 활성화시키는 Boolean값 true면 켜지고 false면 꺼짐
  setter, // modalOpenState의 세터함수
  copyLink, // copy타입일때 복사할 링크 표시부분
  confirmFunc, // 확인 버튼눌렀을 때 작동될 함수
}: ModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<any>();
  const [okText, setOkText] = useState('');
  const [cancelText, setcancelText] = useState('');
  const [iconStyle, setIconStyle] = useState('red');
  const [isOKDisabled, setIsOKDisabled] = useState(false);

  const handleOkButtonDisabled = () => {
    setIsOKDisabled(!isOKDisabled);
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

  useEffect(() => {
    switch (type) {
      case 'check':
        setIsOKDisabled(true);
        setTitle('모임을 열기 전, 한번 더 확인해주세요');
        setContent(
          <Text>
            연령대, 성별, 선정방법은 모임을 열고 난 후는 수정할 수 없습니다.
          </Text>,
        );
        setOkText('모임 만들기');
        setcancelText('좀 더 수정하기');

        break;
      case 'copy':
        setTitle('모임 링크를 복사해 이용해 보세요:)');
        setContent(
          <>
            <Text>{copyLink}</Text>
          </>,
        );
        setOkText('복사하기');
        setcancelText('취소');
        setIconStyle('limegreen');
        break;
      case 'back':
        setTitle('뒤로 가시면 작성하던 내용이 삭제됩니다.');
        setContent(
          <>
            <TextBack>그래도 뒤로가시겠어요?</TextBack>
          </>,
        );
        setOkText('뒤로가기');
        setcancelText('계속 작성하기');
        break;
    }
  }, [type, copyLink]);

  return (
    <>
      <Modal
        width={416}
        title={
          <TitleContainer>
            <ExclamationCircleOutlined style={{ color: iconStyle }} />
            <Title>{title}</Title>
          </TitleContainer>
        }
        open={modalOpenState}
        okText={okText}
        okButtonProps={{
          disabled: isOKDisabled,
          style: {
            ...(type === 'back' && {
              backgroundColor: '#FF4D4F',
              borderColor: '#FF4D4F',
            }),
          },
        }}
        cancelText={cancelText}
        onOk={onOkFunc}
        onCancel={onCancelFunc}
        closable={false}
      >
        {content}
        {type === 'check' ? (
          <>
            <br />
            <Checkbox onChange={handleOkButtonDisabled}>
              <CheckBoxText>모든 안내 사항을 확인했습니다.</CheckBoxText>
            </Checkbox>
          </>
        ) : (
          ''
        )}
      </Modal>
    </>
  );
}
