'use client';
import { colors } from '@/app/styles/colors';
import { Tag } from 'antd';
import styled from 'styled-components';
import Buttons from '../review/write/Buttons';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const ContentConainer = styled.div`
  width: 48.4rem;
  height: 23.8rem;
  background-color: #f1f1f1;

  display: flex;
  flex-direction: column;
  gap: 2.6rem;

  @media (max-width: 1231px) {
    width: 63.8rem;
    height: 31.2rem;
  }

  @media (max-width: 480px) {
    width: 41.5rem;
    height: 23.8rem;
  }
`;

const Sector = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const Imgs = styled.div`
  background-color: ${colors.Grayscale[6]};
  width: 14.6rem;
  height: 14.6rem;
  @media (max-width: 1231px) {
    width: 22rem;
    height: 22rem;
  }

  @media (max-width: 480px) {
    width: 14.6rem;
    height: 14.6rem;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.p`
  width: 31.4rem;
  color: ${colors.Grayscale[13]};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;

  @media (max-width: 1231px) {
    width: 39.5rem;
    font-size: 2rem;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    width: 24.5rem;
    font-size: 1.6rem;
    font-weight: 400;
  }
`;

const MountainInfo = styled.p`
  color: ${colors.Grayscale[7]};
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 2rem;

  @media (max-width: 1231px) {
    font-size: 1.6rem;
    line-height: 3.2rem;
    font-weight: 700;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    line-height: 2rem;
    font-weight: 600;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2.3rem;
`;
interface MyteamProps {
  img: string;
  title: string;
  mountainInfo?: string;
  sort: string;
}

export default function MyTeam({
  img,
  title,
  mountainInfo,
  sort,
}: MyteamProps) {
  const [pageWidth, setPageWidth] = useState<number>(1300);
  const [shortButtonWidth, setShortButtonWidth] = useState('23rem');
  const [longButtonWidth, setLongButtonWidth] = useState('23rem');

  const tagStyle = {
    width: 'fit-content',
    height: '2.6rem',
    fontSize: '1.4rem',
    fontWeight: '600',
    lineHeight: '2.6rem',
    color: colors.System.Warning,
    backgroundColor: colors.System.Warning_bg,
    border: 0,
  };
  useEffect(() => {}, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setPageWidth(width);

      if (width > 1231) {
        setShortButtonWidth('23rem');
        setLongButtonWidth('48.4rem');
      } else if (width <= 1231 && width > 480) {
        setShortButtonWidth('30.8rem');
        setLongButtonWidth('63.5rem');
      } else {
        setShortButtonWidth('19.5rem');
        setLongButtonWidth('41.5rem');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pageWidth]);

  return (
    <>
      <ContentConainer>
        <Sector>
          <Imgs>{img ? <Image src={img} alt="모임이미지" fill /> : ''}</Imgs>
          <Description>
            <Tag style={tagStyle}>{}</Tag>
            <Title>
              {title}해는 수비도 허리가 지적한 낙향하다 최근에 노예로 아닌
              대하여야지.
            </Title>
            <div>
              <MountainInfo>
                {'산이름'} | {'시간'}
              </MountainInfo>
              <MountainInfo>{'코스'}</MountainInfo>
            </div>
          </Description>
        </Sector>
        <ButtonContainer>
          {/* <Buttons width={shortButtonWidth} height="6.6rem" disabled={false}>
            모임 취소하기
          </Buttons>
          <Buttons width={shortButtonWidth} height="6.6rem" disabled={false}>
            모임 수정하기
          </Buttons> */}
          <Buttons width={longButtonWidth} height="6.6rem" disabled={false}>
            모임 후기 남기기
          </Buttons>
        </ButtonContainer>
      </ContentConainer>
    </>
  );
}
