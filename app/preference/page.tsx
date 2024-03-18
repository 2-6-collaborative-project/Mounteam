'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useState } from 'react';
import { Radio, Checkbox } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface ButtonProps {
  $isActive: boolean;
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 17.06rem 0 17.06rem;
  margin: 0 auto;
  margin-bottom: 10rem;
  max-width: 1200px;

  @media (max-width: 768px) {
    padding: 0 7.44rem;
  }

  @media (max-width: 480px) {
    padding: 0 2rem;
  }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  padding: 4.81rem 0 3.68rem;
  margin: auto;
`;

const Notification = styled.div`
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin: auto;
  border-radius: 0.1875rem;
  background: var(--MDS-Primary-50, #d3dcfd);
  color: var(--MDS-GrayScale-13, #000);
  /* Footnote/16 */
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  @media (max-width: 480px) {
    p {
      display: inline;
      margin-right: 0.5rem;
    }
  }
`;

const RadioCol = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.88rem;
  gap: 2.75rem;
  color: var(--MDS-GrayScale-13, #000);
  /* Heading/16 */
  /* font-family: Pretendard; */
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 150% */

  @media (max-width: 480px) {
    padding: 0 10rem 0 0;
  }
`;

const RadioLabel = styled.div`
  color: var(--MDS-GrayScale-13, #000);
  /* Heading/20 */
  /* font-family: Pretendard; */
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.75rem; /* 140% */
`;

const RegionCol = styled.div`
  gap: 0.44rem;
`;

const CheckboxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 4.06rem 0 5.81rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

// antd button or 버튼 컴포넌트로 변경하기
const Button = styled.div<ButtonProps>`
  display: flex;
  width: 30.25rem;
  height: 4.125rem;
  padding: 0.625rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.1875rem;
  background: ${({ $isActive }) =>
    $isActive
      ? 'var(--MDS-Primary-500, #0331d1)'
      : 'var(--MDS-GrayScale-4, #F0F0F0)'};
  color: ${({ $isActive }) =>
    $isActive ? 'white' : 'var(MDS GrayScale-6, #BFBFBF)'};
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2rem;
  margin: auto;
  @media (max-width: 480px) {
    width: calc(100% - 2rem);
    height: 4.125rem;
  }
`;

export default function Preference() {
  const [gender, setGender] = useState(false);
  const [age, setAge] = useState(false);
  const [region, setRegion] = useState(false);
  const [locationConsent, setLocationConsent] = useState(false);
  const [personalInfoConsent, setPersonalInfoConsent] = useState(false);

  const onGenderChange = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };

  const onAgeChange = (e: RadioChangeEvent) => {
    setAge(e.target.value);
  };

  const onRegionChange = (e: RadioChangeEvent) => {
    setRegion(e.target.value);
  };

  const onLocationConsentChange = (e: CheckboxChangeEvent) => {
    setLocationConsent(e.target.checked);
  };

  const onPersonalInfoConsentChange = (e: CheckboxChangeEvent) => {
    setPersonalInfoConsent(e.target.checked);
  };

  const isButtonActive =
    gender && age && region && locationConsent && personalInfoConsent;

  return (
    <Body>
      <Logo>
        <Image
          src="/logo.svg"
          alt="logo icon"
          width={277.24}
          height={93.19}
          priority
        />
      </Logo>
      <Notification>
        <p>
          성별, 연령대, 관심지역 정보를 통해 맞춤형 등산 모임과 코스를
          추천해드립니다.
        </p>
        <p>
          이 정보는 더 적합하고 만족스러운 등산 경험을 제공하기 위해서만
          사용됩니다.
        </p>
      </Notification>

      <RadioCol>
        <RadioLabel>성별</RadioLabel>
        <Radio.Group onChange={onGenderChange} value={gender}>
          <Radio value={1}>여성</Radio>
          <Radio value={2}>남성</Radio>
        </Radio.Group>

        <RadioLabel>연령대</RadioLabel>
        <Radio.Group onChange={onAgeChange} value={age}>
          <Radio value={1}>10대</Radio>
          <Radio value={2}>20대</Radio>
          <Radio value={3}>30대</Radio>
          <Radio value={4}>40대</Radio>
          <Radio value={5}>50대</Radio>
          <Radio value={6}>60대 이상</Radio>
        </Radio.Group>

        <RadioLabel>관심지역</RadioLabel>
        <RegionCol>
          <div>
            <Radio.Group onChange={onRegionChange} value={region}>
              <Radio value={1}>서울</Radio>
              <Radio value={2}>경기도</Radio>
              <Radio value={3}>강원도</Radio>
              <Radio value={4}>충청북도</Radio>
              <Radio value={5}>충청남도</Radio>
            </Radio.Group>
          </div>
          <div>
            <Radio.Group onChange={onRegionChange} value={region}>
              <Radio value={6}>전라북도</Radio>
              <Radio value={7}>전라남도</Radio>
              <Radio value={8}>경상북도</Radio>
              <Radio value={9}>경상남도</Radio>
              <Radio value={10}>제주도</Radio>
            </Radio.Group>
          </div>
        </RegionCol>
      </RadioCol>

      <CheckboxCol>
        <div>
          <Checkbox onChange={onLocationConsentChange}>
            위치 기능 동의 여부
          </Checkbox>
        </div>
        <div>
          <Checkbox onChange={onPersonalInfoConsentChange}>
            개인 정보 사용 동의 여부
          </Checkbox>
        </div>
      </CheckboxCol>
      <ButtonContainer>
        <Button $isActive={isButtonActive}>시작하기</Button>
      </ButtonContainer>
    </Body>
  );
}
