import { colors } from '@/app/styles/colors';
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

const Text = styled.p`
  color: ${colors.Grayscale[13]};
  font-size: 2rem;
  font-weight: 500;
  line-height: 3.6rem;
`;
interface FeedAuthor {
  profileImageUrl: string | null;
  nickname: string;
  authorId: number;
  level: number | null;
}

interface Feed {
  feedId: number;
  author: FeedAuthor;
  tags: string[];
  mainText: string;
  likesCount: number;
  commentCnt: number;
  createdByMe: boolean;
  createdAt: string;
  isLiked: boolean;
  imageUrl: string | null;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface FeedResponse {
  msg: string;
  statusCode: number;
  data: {
    content: Feed[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  };
}

interface MyFeedsProps {
  myFeedData: FeedResponse[];
}

export default function MyFeeds({ myFeedData }: any) {
  return (
    <>
      {myFeedData.length > 0 ? (
        <ImgGrid>
          {/* {myFeedData?.map((myFeedPages: any) =>
          myFeedPages?.map((feed: Feed, index: number) => (
            <Link key={`${index}-feed`} href={`/feeds/${feed.feedId}`}>
              <ImgContainer>
                <Image
                  src={feed.imageUrl ? feed.imageUrl : '/bell.svg'}
                  alt="image"
                  fill
                />
              </ImgContainer>
            </Link>
          )),
        )} */}
          {myFeedData?.map((feed: any, index: number) => (
            <Link key={`${index}-feed`} href={`/feeds/${feed.feedId}`}>
              <ImgContainer>
                <Image src={feed.imageUrls} alt="image" fill unoptimized />
              </ImgContainer>
            </Link>
          ))}
        </ImgGrid>
      ) : (
        <Text>아직 작성한 피드가 없습니다.</Text>
      )}
    </>
  );
}
