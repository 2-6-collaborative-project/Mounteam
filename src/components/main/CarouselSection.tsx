'use client';

import { Carousel } from 'antd';
import styled from 'styled-components';

const contentStyle: React.CSSProperties = {
  margin: 0,
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#40A9FF',
};

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
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </CarouselContainer>
  );
}
