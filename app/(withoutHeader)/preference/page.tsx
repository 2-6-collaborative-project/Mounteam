'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, Checkbox } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ConfigProvider } from 'antd';
import typography from '@/app/styles/typography';
import { colors } from '../../styles/colors';
import { authInstance } from '@/src/lib/axiosInstance';

interface ButtonProps {
  $isActive: boolean;
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  margin-bottom: 10rem;

  @media (max-width: 768px) {
    padding: 0 3.44rem;
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
  background: ${colors.Primary[50]};
  color: ${colors.Grayscale[13]};
  ${typography.Footnote16}
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
  color: ${colors.Grayscale[13]};
  ${typography.Heading16};

  @media (max-width: 480px) {
    padding: 0 10rem 0 0;
  }
`;

const RadioLabel = styled.div`
  color: ${colors.Grayscale[13]};
  ${typography.Heading20}
`;

const RegionCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4375rem;
`;

const CheckboxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 4.06rem 0 5.81rem;
  ${typography.Heading16}
`;

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
    $isActive ? colors.Primary[500] : colors.Grayscale[4]};
  color: ${({ $isActive }) =>
    $isActive ? colors.Grayscale[1] : colors.Grayscale[6]};
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
  ${typography.Heading16}
  margin: auto;
  @media (max-width: 480px) {
    width: calc(100% - 2rem);
    height: 4.125rem;
  }
`;

export default function Preference() {
  const router = useRouter();

  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
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
    !!gender && !!age && !!region && locationConsent && personalInfoConsent;

  const handleSubmit = async () => {
    if (isButtonActive) {
      try {
        const response = await authInstance.post('/user/preferences', {
          gender,
          ageRange: age,
          areaInterest: region,
          locationAgree: locationConsent.toString(),
          privacyAgree: personalInfoConsent.toString(),
        });
        console.log(response.data);
        router.push('/mypage');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
        },
      }}
    >
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
            <Radio value="female">여성</Radio>
            <Radio value="male">남성</Radio>
          </Radio.Group>
          <RadioLabel>연령대</RadioLabel>
          <Radio.Group onChange={onAgeChange} value={age}>
            <Radio value="teenager">10대</Radio>
            <Radio value="twenties">20대</Radio>
            <Radio value="thirties">30대</Radio>
            <Radio value="forties">40대</Radio>
            <Radio value="fifties">50대</Radio>
            <Radio value="sixties">60대 이상</Radio>
          </Radio.Group>

          <RadioLabel>관심지역</RadioLabel>
          <RegionCol>
            <div>
              <Radio.Group onChange={onRegionChange} value={region}>
                <Radio value="서울">서울</Radio>
                <Radio value="경기도">경기도</Radio>
                <Radio value="강원도">강원도</Radio>
                <Radio value="충청북도">충청북도</Radio>
                <Radio value="충청남도">충청남도</Radio>
              </Radio.Group>
            </div>
            <div>
              <Radio.Group onChange={onRegionChange} value={region}>
                <Radio value="전라북도">전라북도</Radio>
                <Radio value="전라남도">전라남도</Radio>
                <Radio value="경상북도">경상북도</Radio>
                <Radio value="경상남도">경상남도</Radio>
                <Radio value="제주도">제주도</Radio>
              </Radio.Group>
            </div>
          </RegionCol>
        </RadioCol>

        <CheckboxCol>
          <Checkbox onChange={onLocationConsentChange}>
            위치 정보 사용 동의 여부
          </Checkbox>
          <Checkbox onChange={onPersonalInfoConsentChange}>
            개인 정보 사용 동의 여부
          </Checkbox>
        </CheckboxCol>
        <Button $isActive={isButtonActive} onClick={handleSubmit}>
          시작하기
        </Button>
      </Body>
    </ConfigProvider>
  );
}
