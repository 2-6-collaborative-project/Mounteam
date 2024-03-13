import styled from 'styled-components';

export const FeedConatiner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
export const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 4.7rem;
  flex-shrink: 0;
  border-bottom: 1px solid var(--gray-D9D9D9);

  @media (max-width: 1199px) and (min-width: 768px) {
  }
  @media (max-width: 767px) {
  }
`;

export const SearchWrapper = styled.div`
  display: flex;

  cursor: pointer;
  align-items: center;

  margin-bottom: 1.7rem;

  & img {
    width: 3rem;
    height: 3rem;
  }

  & input {
    width: 100rem;
    height: 3rem;
    border: none;
    margin-left: 5.5rem;
    padding-left: 2rem;
    ::placeholder {
      color: var(--gray-D9D9D9);
      font-family: Pretendard;
      font-size: 2rem;
      font-weight: 500;
      line-height: 1.6rem;
      letter-spacing: -0.2rem;
    }
  }
`;

export const FeedHomeLayer = styled.div`
  width: 100%;
`;

export const FeedHomeInner = styled.div`
  width: 100%;
  padding: 9.4rem 10.3rem 0;
  display: flex;
  flex-direction: column;

  @media all and (max-width: 767px) {
    padding: 9.4rem 1.6rem 0;
  }
`;

export const FeedPage = styled.div`
  width: 100%;
  height: 100%;
`;
