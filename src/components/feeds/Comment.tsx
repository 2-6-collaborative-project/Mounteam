import styled from 'styled-components';
import { colors } from '@/app/styles/colors';
import Avatars from '@/src/components/shared/Avatar';
import FeedData from '@/src/types/feeds/FeedData';
import { useEffect, useState } from 'react';
import { getUserProfile } from './api/FeedData';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;

  & p {
    color: ${colors.Grayscale[13]};
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.12px;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;

  & img {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-radius: 42.188px;
    background: ${colors.Grayscale[6]};
  }

  & p {
    color: ${colors.Grayscale[13]};
    text-align: center;
    font-feature-settings: 'calt' off;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: -0.12px;
  }
`;

const CommentBody = styled.div`
  width: 315px;
  padding-left: 1rem;
  border: 1px solid ${colors.Grayscale[13]};
  color: ${colors.Grayscale[13]};
  font-size: 2rem;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.12px;

  & div {
    display: flex;
  }
`;

interface CommentProps {
  feedData: FeedData;
}

export default function Comment({ feedData }: CommentProps) {
  console.log(feedData);
  const [nickname, setNickname] = useState('');
  const [profileImg, setProfileImg] = useState('');

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const profileData = await getUserProfile();
        setNickname(profileData.data.nickname);
        setProfileImg(profileData.data.profileImage);
      } catch (error) {
        console.error('프로필 정보 조회 실패:', error);
      }
    }

    fetchUserProfile();
  }, []);

  return (
    <>
      <CommentContainer>
        <CommentHeader>
          <Avatars
            type="comment"
            img={feedData?.author.profileImageUrl}
            name={feedData?.author.nickname}
          />
          의 게시물 댓글
        </CommentHeader>

        <CommentBody>
          {feedData?.comments.map((comment, index) => (
            <div key={index}>
              👦 <p style={{ paddingLeft: '0.5rem' }}>{nickname}:</p>
              <p> {comment}</p>
            </div>
          ))}
        </CommentBody>
      </CommentContainer>
    </>
  );
}
