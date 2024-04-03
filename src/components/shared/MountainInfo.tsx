'use clinet';

import mountainDataProps from '@/src/types/mountainDataProps';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const MountainItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const MountainName = styled.p`
  color: var(--MDS-Grayscale-13, #000);
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 3.2rem;
`;

const MountainDetail = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const MountainLocation = styled.p`
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

const MountainStatus = styled.p`
  position: relative;
  color: var(--MDS-Grayscale-7, #8c8c8c);
  font-size: 1.4rem;
  line-height: 2rem;
`;

const MountainHeight = styled(MountainStatus)`
  &:before {
    content: '';
    width: 0.1rem;
    height: 1.5rem;
    background-color: var(--MDS-Grayscale-7, #8c8c8c);
    position: absolute;
    top: 0.4rem;
    right: -1.3rem;
  }
`;

export default function MountainInfo({ list }: { list: mountainDataProps }) {
  let exploreId;
  if (typeof list === 'object') {
    exploreId = list.exploredId;
  }

  console.log('list', list?.imgUrl);
  return (
    typeof list === 'object' && (
      <Link href={`/explores/${exploreId}/details`}>
        <MountainItem>
          <Image
            layout="responsive"
            width={260}
            height={260}
            objectFit="contain"
            src={list?.imgUrl}
            alt="산 이미지"
          />
          <div>
            <MountainName>{list?.mountain}</MountainName>
            <MountainLocation>{list?.m_location}</MountainLocation>
            <MountainDetail>
              <MountainHeight>{list?.m_height}m</MountainHeight>
              <MountainStatus>모임 개수: {list.teamCnt}</MountainStatus>
            </MountainDetail>
          </div>
        </MountainItem>
      </Link>
    )
  );
}
