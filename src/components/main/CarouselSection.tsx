'use client';

import { Carousel } from 'antd';
import styled from 'styled-components';
import Image from 'next/image';

const StyledSlideContent = styled.h3`
  margin: 0;
  color: #fff;
  line-height: 160px;
  text-align: center;
  background: #40a9ff;
  width: 100%;
  height: 25.125rem;

  @media (max-width: 768px) {
    height: 16.1875rem;
  }

  @media (max-width: 480px) {
    height: 10.5rem;
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default function CarouselSection() {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <CarouselContainer>
      <Carousel afterChange={onChange}>
        <div>
          <StyledSlideContent>1</StyledSlideContent>
        </div>
        <div>
          <StyledSlideContent>2</StyledSlideContent>
        </div>
        <div>
          <StyledSlideContent>3</StyledSlideContent>
        </div>
        <div>
          <StyledSlideContent>4</StyledSlideContent>
        </div>
      </Carousel>
    </CarouselContainer>
  );
}
