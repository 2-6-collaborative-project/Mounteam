import styled from 'styled-components';
import { Popover } from 'antd';

interface FeedImgProps {
  imageUrl?: string;
}

export const InfoBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  padding-top: 1.1rem;

  & p {
    color: #000;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.2rem;
  }
`;

export const LikeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  & img {
    cursor: pointer;
  }
`;

export const CommentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  & img {
    cursor: pointer;
  }
`;

export const BookmarkBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  padding-left: 19rem;

  & img {
    cursor: pointer;
  }
`;

export const TextBox = styled.div`
  width: 31.5rem;
  padding-top: 1.1rem;

  & p {
    color: var(--black-000000);
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.1rem;
    letter-spacing: -0.14px;
  }
`;

export const TagBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding-top: 1.1rem;
  border: none;
`;

export const TagWrapper = styled.div`
  display: flex;
  padding: 0.1rem 0.8rem;
  align-items: center;
  gap: 0.3rem;
  border: 1px solid #0331d1;
  border-radius: 3px;
  background-color: var(--white-FFFFFF);

  & p {
    color: #0331d1;
  }
`;

export const MeatBallFrame = styled.div`
  display: flex;
  position: absolute;
  padding: 10px 0px 10px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  & img {
    cursor: pointer;
    position: relative;
    margin-left: 28rem;
    width: auto;
    height: auto;
  }
`;
export const PictureBox = styled.div`
  width: 31.5rem;
  height: 31.5rem;
`;
export const FeedHead = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  width: 31.5rem;
  padding-bottom: 1.1rem;
`;

export const HeadWrapper = styled.div`
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  background-color: whitesmoke;
  border-radius: 50%;
  overflow: hidden;
`;

export const HeadFont = styled.div`
  color: var(--black-000000);
  font-weight: 600;
  font-size: 12px;
`;

export const AvatarImage = styled.img`
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 0.75rem;
  left: 0.75rem;
`;

export const FeedImg = styled.div<FeedImgProps>`
  display: flex;
  width: 3rem;
  height: 3rem;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
`;

export const FeedGrid = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 3.5rem;
  column-gap: 2.3rem;

  @media (max-width: 1199px) and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const FeedConatiner = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 10rem;
`;
export const SearchContainer = styled.div`
  display: flex;
  width: 99.2rem;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  border-bottom: 1px solid var(--black-000000);
  margin: 0 auto;

  @media (max-width: 1199px) and (min-width: 768px) {
    width: 100%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1rem;
  cursor: pointer;

  & img {
    width: 2.4rem;
    height: 2.4rem;
  }

  & input {
    width: 16rem;
    height: 3rem;
    border: none;
    padding-left: 1rem;

    ::placeholder {
      color: var(#8c8c8c);
      text-align: center;
      font-size: 2rem;
      font-weight: 400;
      line-height: 3.6rem;
    }
  }

  @media all and (max-width: 767px) {
    margin-left: -2.5rem;
  }
`;

export const FeedHomeLayer = styled.div`
  width: 100%;
  height: auto;
  padding: 18rem;
`;

export const FeedHomeInner = styled.div`
  width: 100%;
  padding: 0 22.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1199px) and (min-width: 768px) {
    padding: 0 auto;
  }
  @media all and (max-width: 767px) {
    padding: 0 3rem;
  }
`;

// export const CustomPopover = styled.div`
//   position: relative;
//   display: inline-block;
// `;

// export const PopoverContent = styled.div`
//   position: absolute;
//   bottom: -5px;
//   left: 50%;
//   transform: translateX(-50%);
//   background-color: white;
//   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//   padding: 10px;
//   border-radius: 5px;
//   z-index: 1;
//   display: none;
// `;

// export const CustomPopoverContainer = styled(CustomPopover)`
//   &:hover ${PopoverContent} {
//     display: block;
//   }
// `;
