import styled from 'styled-components';
import user from '@/public/user.svg';
import { colors } from '@/app/styles/colors';

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

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

const AvatarImage = styled.img`
  padding: 0.4rem;
  width: 2rem;
  height: 2rem;
  background-color: ${colors.Grayscale[6]};
`;

const CommentBody = styled.div`
  width: 315px;
  border: 1px solid ${colors.Grayscale[13]};
  color: ${colors.Grayscale[13]};
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.12px;
`;
export default function Comment({ feedData }: any) {
  return (
    <>
      <CommentContainer>
        <CommentHeader>
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
          <p>{feedData.author.nickname}</p>
        </CommentHeader>
        <CommentBody>
          {feedData.comments.map((comment: string[], index: number) => (
            <p key={index}>{comment}</p>
          ))}
        </CommentBody>
      </CommentContainer>
    </>
  );
}
