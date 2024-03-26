import { useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { Carousel } from 'antd';
import meatballs from '@/public/meatballs.svg';
import user from '@/public/user.svg';
import { CustomPopover } from '../shared/CustomPopover';
import Link from 'next/link';
import { InfoBox } from '../shared/InfoBox';
import { colors } from '@/app/styles/colors';

const contentStyle: React.CSSProperties = {
  margin: 0,
  color: '#A0ABC0',
  lineHeight: '40rem',
  textAlign: 'center',
  background: '#d9d9d9',
};

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

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow: hidden;
  border-radius: 50%;
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

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 35px;
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 569px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const TagContainer = styled.div`
  display: flex;
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
  width: 56.9rem;
  padding-top: 1rem;

  & p {
    color: ${colors.Grayscale[13]};
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
  }
`;
const CommentBarContainer = styled.div`
  display: flex;
  width: 484px;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px solid ${colors.Grayscale[13]};
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
    padding-left: 1rem;

    ::placeholder {
      color: ${colors.Grayscale[5]};
      text-align: center;
      font-size: 20px;
      font-weight: 400;
      line-height: 36px;
    }
  }
`;

export default function FeedDetail({ feedData }: any) {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const content = (
    <PopoverContentBox>
      <Link href="/">수정</Link>
      <Link href="/">삭제</Link>
    </PopoverContentBox>
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value; // setvalue 아직 안해줌
  };

  return (
    <>
      <ProfileCarouselContainer>
        <ProfileContainer>
          <ProfileWrapper>
            <AvatarWrapper>
              <AvatarImage
                src={
                  feedData.author.profileImageUrl
                    ? feedData.author.profileImageUrl
                    : user.src
                }
                alt="Profile Image"
              />
            </AvatarWrapper>

            <HeadFont>
              {<p style={{ fontWeight: 400 }}>Lv. {feedData.author.level}</p>}
              {<p>{feedData.author.nickname}</p>}
            </HeadFont>

            <MeatBallFrame>
              {feedData.createdByme && (
                <CustomPopover content={content}>
                  <Image src={meatballs} alt="미트볼" />
                </CustomPopover>
              )}
            </MeatBallFrame>
          </ProfileWrapper>
        </ProfileContainer>
        <CarouselConatiner>
          <Carousel afterChange={onChange}>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </CarouselConatiner>
      </ProfileCarouselContainer>
      <InfoContainer>
        <InfoWrapper>
          <TagContainer>
            {feedData.tags.map((tag: any, index: number) => (
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
        <CommentBarContainer onClick={handleClick}>
          <CommentBarWrapper>
            <AvatarImage
              src={
                feedData.author.profileImageUrl
                  ? feedData.author.profileImageUrl
                  : user.src
              }
              style={{
                borderRadius: '100%',
                width: '2.4rem',
                height: '2.4rem',
                objectFit: 'cover',
              }}
              alt="Profile Image"
            />
            <TextWrapper>
              <input
                placeholder="댓글 쓰기"
                ref={inputRef}
                onChange={handleInputChange}
              />
            </TextWrapper>
          </CommentBarWrapper>
        </CommentBarContainer>
      </InfoContainer>
    </>
  );
}
