import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import meatballs from '@/public/meatballs.svg';
import Avatars from '@/src/components/shared/Avatar';
import FeedModify from '@/src/components/feeds/FeedModify';
import { useRef, useState } from 'react';
import { CustomPopover } from '@/src/components/shared/CustomPopover';
import { Carousel } from 'antd';
import { InfoBox } from '@/src/components/shared/InfoBox';
import { colors } from '@/app/styles/colors';
import { useFeedIdStore } from '@/src/store/useFeedIdStore';
import FeedData from '@/src/types/feeds/FeedData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteFeedData,
  getFeedSelect,
  postFeedComments,
  postFeedData,
} from './api/FeedData';
import Comment from './Comment';

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

const AvatarImage = styled.img`
  padding: 0rem;
  width: 4.8rem;
  height: 4.8rem;
  background-color: ${colors.Grayscale[6]};
  object-fit: cover;
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
  gap: 11px;
`;

const TextWrapper = styled.div`
  width: 100%;
  & input {
    width: 100%;
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

interface FeedDetailProps {
  feedData: FeedData;
}
export default function FeedDetail({ feedData }: FeedDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: () => postFeedComments(feedData.feedId, { content: comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] });
      setComment('');
    },
  });

  // const deleteFeedMutation = useMutation(
  //   () => deleteFeedData(feedData.feedId),
  // {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['feedData']);
  //     // 삭제 성공 메시지 표시, 모달 닫기 등의 추가 동작 가능
  //     alert("피드가 성공적으로 삭제되었습니다.");
  //     setIsModalOpen(false); // 모달을 닫는 경우
  //   },
  //   // 오류 처리
  //   onError: () => {
  //     alert("피드 삭제 중 오류가 발생했습니다.");
  //     console.error("오류발생");
  //   },
  // }
  // )

  // const handleDeleteClick = () => {
  //   const isConfirmed = window.confirm("피드를 삭제하시겠습니까?");
  //   if (isConfirmed) {
  //     deleteFeedMutation.mutate(feedData.feedId);
  //   }
  // };

  const onChange = (currentSlide: number) => {
    // console.log(currentSlide);
  };

  const handleEditClick = (feedId: number) => {
    setIsModalOpen(!isModalOpen);
  };

  const content = (
    <PopoverContentBox>
      <p onClick={() => handleEditClick(feedData.feedId)}>수정</p>
      <p>삭제</p>
    </PopoverContentBox>
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addCommentMutation.mutate();
  };

  console.log(feedData);
  return (
    <>
      <ContentsContainer>
        <ProfileCarouselContainer>
          <ProfileContainer>
            <ProfileWrapper>
              <Avatars type="comment" img={feedData.author.profileImageUrl} />
              <HeadFont>
                {<p style={{ fontWeight: 400 }}>Lv. {feedData.author.level}</p>}
                {<p>{feedData.author.nickname}</p>}
              </HeadFont>

              <MeatBallFrame>
                {feedData.createdByMe && (
                  <CustomPopover content={content}>
                    <Image src={meatballs} alt="미트볼" />
                  </CustomPopover>
                )}
              </MeatBallFrame>
            </ProfileWrapper>
          </ProfileContainer>
          <CarouselConatiner>
            <Carousel afterChange={onChange}>
              {feedData.imageUrls.map((url, index) => (
                <CarouselWrapper key={index}>
                  <Image
                    width={'100'}
                    height={'100'}
                    src={url}
                    alt={`img-${index}`}
                    objectFit="cover" // 이미지가 컨테이너를 꽉 채우도록 조정
                  />
                </CarouselWrapper>
              ))}
            </Carousel>
          </CarouselConatiner>
        </ProfileCarouselContainer>
        <InfoContainer>
          <InfoWrapper>
            <TagContainer>
              {feedData.tags.map((tag, index) => (
                <TagWrapper key={index}>
                  <p>{tag}</p>
                </TagWrapper>
              )) || <p>태그가 없습니다.</p>}
            </TagContainer>
            {feedData.mainText ? (
              <TextBox>
                <p>{feedData.mainText}</p>
              </TextBox>
            ) : (
              '게시글의 텍스트가 없을때 이 텍스트가 나옵니다.'
            )}

            <InfoBox feed={feedData} $paddingleft="0rem" />
          </InfoWrapper>
          <form onSubmit={handleSubmit}>
            <CommentBarContainer onClick={handleClick}>
              <CommentBarWrapper>
                <Avatars type="comment" img={feedData.author.profileImageUrl} />
                <TextWrapper>
                  <input
                    placeholder="댓글을 작성해주세요"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </TextWrapper>
              </CommentBarWrapper>
            </CommentBarContainer>
          </form>
          <Comment feedData={feedData} />
        </InfoContainer>
      </ContentsContainer>
      {isModalOpen && feedData.feedId !== null && (
        <FeedModify
          feedId={feedData.feedId}
          modalOpenState={isModalOpen}
          setter={setIsModalOpen}
        />
      )}
    </>
  );
}
