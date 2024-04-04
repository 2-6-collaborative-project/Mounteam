'use clinet';

import { colors } from '@/app/styles/colors';
import mountainDataProps from '@/src/types/mountainDataProps';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const MountainItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const MountainContent = styled.div``;

const MountainImage = styled.div`
  & > img {
    max-width: 100%;
    max-height: auto;
  }
`;

const MountainName = styled.p`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 3.2rem;
`;

const MountainDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${colors.Grayscale[7]};
`;

const MountainLocation = styled.p`
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

const MountainStatus = styled.p`
  font-size: 1.4rem;
  line-height: 2rem;
`;

interface MountainType {
  X좌표: number;
  Y좌표: number;
  명산_높이: number;
  명산_소재지: string;
  명산_이름: string;
  exploredId: number;
  mountain: string;
  imageUrls: string;
  m_location: string;
  m_height: string;
  teamCnt: number;
}

export default function MountainInfo({
  type,
  list,
}: {
  type: 'explore' | 'curation';
  list: MountainType;
}) {
  if (type === 'explore') {
    const exploreId = list.X좌표;

    return (
      <Link href={`/explores/${exploreId}/details`}>
        <MountainItem>
          <Image
            layout="responsive"
            width={260}
            height={260}
            objectFit="contain"
            src={'/sample.jpg'}
            alt="산 이미지"
          />
          <div>
            <MountainName>{list?.명산_이름}</MountainName>
            <MountainLocation>{list?.명산_소재지}</MountainLocation>
            <MountainDetail>
              <MountainStatus>{list?.명산_높이}m</MountainStatus>
              <p> | </p>
              <MountainStatus>모임 개수: 0개</MountainStatus>
            </MountainDetail>
          </div>
        </MountainItem>
      </Link>
    );
  }

  if (type === 'curation') {
    const exploreId = list.exploredId;

    return (
      <Link href={`/explores/${exploreId}/details`}>
        <MountainItem>
          <MountainImage>
            <Image
              width={300}
              height={300}
              objectFit="cover"
              src={list?.imageUrls}
              alt="산 이미지"
            />
          </MountainImage>
          <MountainContent>
            <MountainName>{list?.mountain}</MountainName>
            <MountainLocation>{list?.m_location}</MountainLocation>
            <MountainDetail>
              <MountainStatus>{list?.m_height}m</MountainStatus>
              <p> | </p>
              <MountainStatus>모임 개수: {list.teamCnt}</MountainStatus>
            </MountainDetail>
          </MountainContent>
        </MountainItem>
      </Link>
    );
  }
}
