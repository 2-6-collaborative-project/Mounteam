'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useState } from 'react';
import { Radio, Checkbox } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 17.06rem 0 17.06rem;
  margin-bottom: 10rem;

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
  margin: auto;
`;

const Notification = styled.div`
  margin: auto;
  /* 추후 디자인 수정 반영 */
`;

const RadioLabel = styled.div`
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.75rem;
`;

const RadioCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.75rem;
  @media (max-width: 480px) {
    padding: 0 10rem 0 0;
  }
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

// Button은 조건부 스타일링을 위해 아래에 있습니다.

export default function Preference() {
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [region, setRegion] = useState(null);
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

  // antd button or 버튼 컴포넌트로 변경하기
  const Button = styled.div`
    display: flex;
    width: 30.25rem;
    height: 4.125rem;
    padding: 0.625rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 0.1875rem;
    background: ${isButtonActive
      ? 'var(--MDS-Primary-500, #0331d1)'
      : 'var(--MDS-GrayScale-4, #F0F0F0)'};
    color: ${isButtonActive ? 'white' : 'var(MDS GrayScale-6, #BFBFBF)'};
    cursor: ${isButtonActive ? 'pointer' : 'not-allowed'};
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2rem;
    margin: auto;
    @media (max-width: 480px) {
      width: 26rem;
      height: 4.125rem;
    }
  `;

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
        <Button>시작하기</Button>
      </ButtonContainer>
    </Body>
  );
}
