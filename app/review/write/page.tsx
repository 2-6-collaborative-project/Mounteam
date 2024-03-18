import ReviewWrite from '@/src/components/review/write/ReviewWrite';
import React from 'react';
import styled from 'styled-components';
const Header = styled.div``;

const Nav = styled.div``;

const InputsContainer = styled.div``;

const ModalContainer = styled.div``;

export default function reviewWrite() {
  return (
    <>
      <Header />
      <Nav />
      <InputsContainer>
        <ReviewWrite />
      </InputsContainer>
      <ModalContainer></ModalContainer>
    </>
  );
}
