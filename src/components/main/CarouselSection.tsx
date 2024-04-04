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
  height: auto;
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
      <Carousel autoplay>
        <div>
          <StyledSlideContent>
            <Image
              src={'/season.jpg'}
              alt="계절별 추천 이미지"
              layout="responsive"
              width={1200}
              height={527.42}
              priority
            />
          </StyledSlideContent>
        </div>
        <div>
          <StyledSlideContent>
            <Image
              src={'/beginner.jpg'}
              alt="초심자 추천 이미지"
              layout="responsive"
              width={1200}
              height={527.42}
              priority
            />
          </StyledSlideContent>
        </div>
        <div>
          <StyledSlideContent>
            <Image
              src={'/teamsample.jpg'}
              alt="모임 추천 이미지"
              layout="responsive"
              width={1200}
              height={527.42}
              priority
            />
          </StyledSlideContent>
        </div>
      </Carousel>
    </CarouselContainer>
  );
}
