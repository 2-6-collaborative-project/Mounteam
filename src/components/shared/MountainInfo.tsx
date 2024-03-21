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

export default function MountainInfo() {
  return (
    <Link href="/explore/course">
      <MountainItem>
        <Image
          layout="responsive"
          width={260}
          height={260}
          objectFit="contain"
          src="/sample.jpg"
          alt="산 이미지"
        />
        <div>
          <MountainName>관악산</MountainName>
          <MountainLocation>산 위치 정보</MountainLocation>
          <MountainDetail>
            <MountainHeight>높이: 632m</MountainHeight>
            <MountainStatus>코스 개수: 15개</MountainStatus>
          </MountainDetail>
        </div>
      </MountainItem>
    </Link>
  );
}
