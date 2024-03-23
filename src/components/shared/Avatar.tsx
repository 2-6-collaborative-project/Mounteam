import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const AvatarContainer = styled.div<Type>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.type === 'comment' ? '0.9rem' : '0')};
`;

const Name = styled.p<Type>`
  color: var(--black-000000);
  font-weight: ${(props) => (props.type === 'comment' ? '500' : '600')};
  font-size: ${(props) => (props.type === 'comment' ? '1.2rem' : '2.4rem')};
`;

interface Type {
  type: 'comment' | 'profile';
}

interface AvatarProps extends Type {
  img?: string | any;
  level?: string | undefined;
  name?: string | undefined;
}

export default function Avatars({ type, img, name }: AvatarProps) {
  const [imgSize, setImgSize] = useState(27);
  useEffect(() => {
    switch (type) {
      case 'comment':
        setImgSize(27);
        break;
      case 'profile':
        setImgSize(128);
        break;
      default:
        setImgSize(27);
    }
  }, []);

  return (
    <AvatarContainer type={type}>
      {img ? (
        <Avatar size={imgSize} src={img} />
      ) : (
        <Avatar size={imgSize} icon={img ? img : <UserOutlined />} />
      )}
      {type === 'comment' ? <Name type={type}>{name}</Name> : ''}
    </AvatarContainer>
  );
}
