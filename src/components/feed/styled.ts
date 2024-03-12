import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4rem;

  border-bottom: 1px solid black;

  @media (max-width: 1199px) and (min-width: 768px) {
  }
  @media (max-width: 767px) {
  }
`;

export const SearchWrapper = styled.div`
  width: 3rem;
  & img {
    object-fit: cover;
  }
`;

export const FeedLayer = styled.div`
  width: 100%;
  height: 100%;
`;

export const PlaceholderWrapper = styled.div``;
