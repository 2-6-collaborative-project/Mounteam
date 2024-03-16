import Image from 'next/image';
import styled from 'styled-components';

interface styledSize {
  size: 'small' | 'medium' | 'large' | 'huge' | undefined;
}

interface AvatarProps extends styledSize {
  img: string | any;
  level: string | undefined;
  name: string | undefined;
}
const AvatarContainer = styled.div<styledSize>`
  display: flex;
  align-items: center;
  gap: ${(props) =>
    props.size === 'small'
      ? '1.2rem'
      : props.size === 'medium'
        ? '0.8rem'
        : props.size === 'large'
          ? '1.1rem'
          : props.size === 'huge'
            ? '0.7rem'
            : '0.8rem'};
`;

const ImgContainer = styled.div<styledSize>`
  width: ${(props) =>
    props.size === 'small'
      ? '24px'
      : props.size === 'medium'
        ? '32px'
        : props.size === 'large'
          ? '40px'
          : props.size === 'huge'
            ? '64px'
            : '32px'};
  aspect-ratio: 1;
  position: relative;
  border-radius: 50%;
`;

const NameContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Level = styled.p<styledSize>`
  color: var(--black-000000);
  font-weight: ${(props) =>
    props.size === 'small'
      ? '400'
      : props.size === 'medium'
        ? '400'
        : props.size === 'large'
          ? '600'
          : props.size === 'huge'
            ? '700'
            : '400'};
  font-size: ${(props) =>
    props.size === 'small'
      ? '12px'
      : props.size === 'medium'
        ? '12px'
        : props.size === 'large'
          ? '14px'
          : props.size === 'huge'
            ? '16px'
            : '12px'};
`;

const Name = styled.p<styledSize>`
  color: var(--black-000000);
  font-weight: ${(props) =>
    props.size === 'small'
      ? '400'
      : props.size === 'medium'
        ? '400'
        : props.size === 'large'
          ? '600'
          : props.size === 'huge'
            ? '700'
            : '400'};
  font-size: ${(props) =>
    props.size === 'small'
      ? '12px'
      : props.size === 'medium'
        ? '12px'
        : props.size === 'large'
          ? '14px'
          : props.size === 'huge'
            ? '16px'
            : '12px'};
`;

export default function Avatar({ size, img, level, name }: AvatarProps) {
  // size 프롭으로'small' | 'medium' | 'large' | 'huge' 내려주면 크기지정가능 기본값으로 medium
  return (
    <AvatarContainer size={size}>
      <ImgContainer size={size}>
        <Image src={img} alt="프로필이미지" layout="fill" loading="eager" />
      </ImgContainer>
      <NameContainer>
        <Level size={size}>{'Lv.' + level}</Level>
        <Name size={size}>{name}</Name>
      </NameContainer>
    </AvatarContainer>
  );
}
