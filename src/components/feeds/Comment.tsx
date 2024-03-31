import styled from 'styled-components';
import { colors } from '@/app/styles/colors';
import Avatars from '@/src/components/shared/Avatar';

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
          <Avatars
            type="comment"
            img={feedData.author.profileImageUrl}
            name={feedData.author.nickname}
          />
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
