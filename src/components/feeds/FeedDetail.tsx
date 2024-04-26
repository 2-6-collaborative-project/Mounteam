import styled from 'styled-components';
import Image from 'next/image';
import meatballs from '@/public/meatballs.svg';
import Avatars from '@/src/components/shared/Avatar';
import FeedModify from '@/src/components/feeds/FeedModify';
import { useCallback, useRef, useState } from 'react';
import { CustomPopover } from '@/src/components/shared/CustomPopover';
import { Carousel } from 'antd';
import { InfoBox } from '@/src/components/shared/InfoBox';
import { colors } from '@/app/styles/colors';
import FeedData from '@/src/types/feeds/FeedData';
import {
  QueryObserverResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  deleteFeedData,
  deleteLikes,
  getFeedComments,
  getFeedSelect,
  postFeedComments,
  postLikes,
} from './api/FeedData';
import Comment from './Comment';
import { useParams } from 'next/navigation';
import useFeedParams from './useFeedParams';
import { useFeedDetailQuery } from './query/useFeedDetailQuery';

const contentStyle: React.CSSProperties = {
  margin: 0,
  color: '#A0ABC0',
  lineHeight: '40rem',
  textAlign: 'center',
  background: '#d9d9d9',
};

const ContentsContainer = styled.div`
  width: 100%;
  max-width: 99.2rem;
  height: auto;
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  padding-bottom: 10rem;

  @media (max-width: 768px) {
    max-width: 63.9rem;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProfileCarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 39.9rem;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const HeadFont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & p {
    color: ${colors.Grayscale[13]};
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
  }
`;

const MeatBallFrame = styled.div`
  display: flex;
  position: absolute;
  padding: 10px 0px 10px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  & img {
    cursor: pointer;
    position: relative;
    margin-left: 36.7rem;
    width: auto;
    height: auto;
  }
`;

const PopoverContentBox = styled.div`
  display: flex;
  cursor: pointer;
  width: 71px;
  flex-direction: column;
  align-items: center;
`;

const CarouselConatiner = styled.div`
  width: 39.9rem;
  height: 39.9rem;
  flex-shrink: 0;

  background: ${colors.Grayscale[5]};
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  & img {
    object-fit: cover;
  }
`;

const InfoContainer = styled.div`
  max-width: 56.9rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.5rem;

  @media (max-width: 768px) {
    max-width: 39.9rem;
  }
  @media (max-width: 480px) {
    max-width: 39.9rem;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  max-width: 56.9rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const TagWrapper = styled.div`
  display: flex;
  padding: 2px 8px;
  justify-content: center;
  align-items: center;

  border-radius: 3px;
  border: 1px solid ${colors.Primary[500]};
  background: ${colors.Grayscale[1]};

  & p {
    color: ${colors.Primary[500]};
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  }
`;

const TextBox = styled.div`
  width: 100%;
  max-width: 56.9rem;
  padding-top: 1rem;

  & p {
    color: ${colors.Grayscale[13]};
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;

    @media (max-width: 768px) {
      max-width: 39.9rem;
    }
    @media (max-width: 480px) {
      max-width: 39.9rem;
    }
  }
`;
const CommentBarContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 48.4rem;
  padding: 0 15rem 0 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px solid ${colors.Grayscale[13]};

  @media (max-width: 768px) {
    max-width: 39.9rem;
  }
  @media (max-width: 480px) {
    max-width: 39.9rem;
  }
`;

const CommentBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 0.5rem 0;
`;

const TextWrapper = styled.div`
  width: 100%;
  & input {
    width: 100%;
    padding-left: 1rem;
    height: 3rem;
    border: none;

    ::placeholder {
      color: ${colors.Grayscale[5]};
      text-align: center;
      font-size: 20px;
      font-weight: 400;
      line-height: 36px;
    }
  }
`;

export default function FeedDetail() {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState('');

  const { feedId, feedType } = useFeedParams();
  const feedDetailQuery = useFeedDetailQuery(feedType, feedId);

  const addCommentMutation = useMutation({
    mutationFn: () =>
      postFeedComments(feedType!, feedId, {
        content: comment,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['feed', 'detail', feedType, feedId],
      });
      setComment('');
    },
  });

  const deleteFeedMutation = useMutation({
    mutationFn: (feedId: number) => deleteFeedData(feedType!, feedId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['feed', 'detail', feedType, feedId],
      });
    },
  });

  const handleDeleteClick = (feedId: number) => {
    deleteFeedMutation.mutate(feedId);
  };

  const onChange = (currentSlide: number) => {
    // console.log(currentSlide);
  };

  const handleEditClick = (feedId: number) => {
    setIsModalOpen(!isModalOpen);
  };

  const content = (
    <PopoverContentBox>
      <p onClick={() => handleEditClick(feedId)}>수정</p>
      <p onClick={() => handleDeleteClick(feedId)}>삭제</p>
    </PopoverContentBox>
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      addCommentMutation.mutate();
    },
    [addCommentMutation],
  );

  const handleCommentChange = useCallback((e: any) => {
    setComment(e.target.value);
  }, []);

  return (
    <>
      <ContentsContainer>
        <ProfileCarouselContainer>
          <ProfileContainer>
            <ProfileWrapper>
              <Avatars
                type="comment"
                img={feedDetailQuery.data.author.profileImageUrl}
              />
              <HeadFont>
                {
                  <p style={{ fontWeight: 400 }}>
                    Lv. {feedDetailQuery.data.author.level}
                  </p>
                }
                {<p>{feedDetailQuery.data.author.nickname}</p>}
              </HeadFont>

              <MeatBallFrame>
                {feedDetailQuery.data.createByMe && (
                  <CustomPopover content={content}>
                    <Image src={meatballs} alt="미트볼" />
                  </CustomPopover>
                )}
              </MeatBallFrame>
            </ProfileWrapper>
          </ProfileContainer>
          <CarouselConatiner>
            <Carousel afterChange={onChange} autoplay>
              {feedDetailQuery.data.imageUrls.map(
                (url: string, index: number) => (
                  <CarouselWrapper key={index}>
                    <Image
                      width="399"
                      height="399"
                      src={url}
                      alt={`img-${index}`}
                    />
                  </CarouselWrapper>
                ),
              )}
            </Carousel>
          </CarouselConatiner>
        </ProfileCarouselContainer>
        <InfoContainer>
          <InfoWrapper>
            <TagContainer>
              {feedDetailQuery.data.tags.map((tag: string[], index: number) => (
                <TagWrapper key={index}>
                  <p>{tag}</p>
                </TagWrapper>
              )) || <p>태그가 없습니다.</p>}
            </TagContainer>
            {feedDetailQuery.data.mainText ? (
              <TextBox>
                <p>{feedDetailQuery.data.mainText}</p>
              </TextBox>
            ) : (
              '게시글의 텍스트가 없을때 이 텍스트가 나옵니다.'
            )}

            <InfoBox feed={feedDetailQuery.data} $paddingleft="0rem" />
          </InfoWrapper>
          <form onSubmit={handleSubmit}>
            <CommentBarContainer onClick={handleClick}>
              <CommentBarWrapper>
                <Avatars
                  type="comment"
                  img={feedDetailQuery.data.author.profileImageUrl}
                />
                <TextWrapper>
                  <input
                    placeholder="댓글을 작성해주세요"
                    value={comment}
                    onChange={handleCommentChange}
                  />
                </TextWrapper>
              </CommentBarWrapper>
            </CommentBarContainer>
          </form>
          <Comment feedData={feedDetailQuery.data} />
        </InfoContainer>
        {isModalOpen && feedId !== null && (
          <FeedModify
            feedType={feedType!}
            feedId={feedId}
            content={feedDetailQuery.data.mainText}
            modalOpenState={isModalOpen}
            setter={setIsModalOpen}
          />
        )}
      </ContentsContainer>
    </>
  );
}
