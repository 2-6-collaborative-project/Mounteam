import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const ImgGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto, 1fr);
  column-gap: 2.3rem;
  row-gap: 3.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto, 1fr);
    column-gap: 2.4rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(auto, 1fr);
  }
`;

const ImgContainer = styled.div`
  width: 31.5rem;
  height: 31.5rem;
  position: relative;
  @media (max-width: 768px) {
    width: 30.8rem;
    height: 30.8rem;
  }

  @media (max-width: 480px) {
    width: 41.5rem;
    height: 41.5rem;
  }
`;
interface MyFeedData {
  MyFeedData: MyFeedData;
}

interface MyFeedDataProps {
  MyFeedData: MyFeedData;
}

export default function MyFeeds({ MyFeedData }: MyFeedDataProps) {
  return (
    <>
      <ImgGrid>
        <ImgContainer>
          <Image src={'/bell.svg'} alt="image" fill unoptimized={true} />
        </ImgContainer>
      </ImgGrid>
    </>
  );
}
