'use client';

import Profile from '@/src/components/mypage/Profile';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rem;
  padding: 0 3.2rem 0 3.2rem;
`;

const Flex = styled.div`
  margin: 0 auto 0 auto;
`;

const Selector = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  gap: 1.6rem;
`;

const Text1 = styled.p<StyledProps>`
  height: 4.1rem;

  color: var(--black-000000);
  font-size: 2rem;
  font-weight: 400;
  line-height: 3.6rem;

  border-bottom: ${(props) => (props.selector === 1 ? '1px solid #000;' : '')};
`;

const Text2 = styled.p<StyledProps>`
  height: 4.1rem;

  color: var(--black-000000);
  font-size: 2rem;
  font-weight: 400;
  line-height: 3.6rem;

  border-bottom: ${(props) => (props.selector === 2 ? '1px solid #000;' : '')};
`;

const Text3 = styled.p<StyledProps>`
  height: 4.1rem;

  color: var(--black-000000);
  font-size: 2rem;
  font-weight: 400;
  line-height: 3.6rem;

  border-bottom: ${(props) => (props.selector === 3 ? '1px solid #000;' : '')};
`;

interface StyledProps {
  selector: number;
}

export default function Mypage() {
  const [selector, setSelector] = useState(1);

  return (
    <>
      <ContentsContainer>
        <Profile
          level={12}
          name={''}
          img={''}
          description={''}
          clickShowAll={() => {}}
          clickVerify={() => {}}
        />

        <Selector>
          <Text1
            selector={selector}
            onClick={() => {
              setSelector(1);
            }}
          >
            피드
          </Text1>
          <Text2
            selector={selector}
            onClick={() => {
              setSelector(2);
            }}
          >
            저장됨
          </Text2>
          <Text3
            selector={selector}
            onClick={() => {
              setSelector(3);
            }}
          >
            모임
          </Text3>
        </Selector>
      </ContentsContainer>
    </>
  );
}
