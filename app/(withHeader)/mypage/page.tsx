'use client';

import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getUserData } from '@/src/components/mypage/api/getUserData';
import MyFeeds from '@/src/components/mypage/MyFeeds';
import MyTeamList from '@/src/components/mypage/MyTeamList';
import Profile from '@/src/components/mypage/Profile';
import Tab from '@/src/components/shared/Tab';
import { getMyFeedData } from '@/src/components/mypage/api/getMyFeedData';
import { getMyTeamData } from '@/src/components/mypage/api/getMyTeamsData';

const TabContainer = styled.div`
  margin-bottom: 8rem;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rem;
`;

const FlexContainer = styled.div`
  width: 100%;
  min-width: 41.5rem;
  padding-bottom: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
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
  const [myFeeds, setMyFeeds] = useState<any>([]);
  const [hasNext, setHasNext] = useState(true);
  const observerTarget = useRef(null);

  const { data: userData, refetch: refetchUserData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  const { data: myTeamsData, refetch: refetchTeamData } = useQuery({
    queryKey: ['myTeamData'],
    queryFn: getMyTeamData,
  });

  const { data: myFeedData } = useQuery({
    queryKey: ['myFeedData'],
    queryFn: getMyFeedData,
  });

  const refetchTeamsData = () => {
    refetchTeamData();
  };

  // 처음 데이터 불러오기 그후 마지막 객체의 id따기=state만들기
  // 그이후부터는 트리거가 걸리면 커서에 data.feeds배열에 푸시해야함 | data.hasNext
  // 마지막 객체의 id값을넣어서 이전 데이터 배열에.push

  // const getFirstFeedData = async () => {
  //   const data = await getMyFeedData(0);
  //   const feeds = [data.data.feeds];

  //   setMyFeeds(feeds);
  // };

  // useEffect(() => {
  //   getFirstFeedData();
  // }, []);

  // const getNextFeedData = async () => {
  //   if (myFeeds.length > 0 && hasNext) {
  //     const lastChild = myFeeds[myFeeds.length - 1];
  //     const cursor = lastChild[lastChild.length - 1].feedId;
  //     console.log('cursor', cursor);
  //     const nextData = await getMyFeedData(cursor);
  //     setHasNext(nextData.hasNext);
  //     console.log('nextData.data.feeds', nextData.data.feeds);
  //     const a = nextData.data.feeds;
  //     setMyFeeds((prevState: any) => [...prevState, a]);
  //   }
  //   if (!hasNext) {
  //     console.log(myFeeds);
  //   }
  // };

  // useEffect(() => {
  //   // 옵저버 API 설정하기

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       // 루트 콘테이너와 교집합이 발생하면(화면 범위에 들어오면)
  //       if (entries[0].isIntersecting) {
  //         // 다음 페이지 불러오기
  //         getNextFeedData(); //불러오기함수넣어주기
  //       }
  //     },
  //     // 1.0, 타겟 전체가 교집합이 됐을 때 작동
  //     { threshold: 1 },
  //   );
  //   // 타겟이 마운트되서 ref 객체에 참조 객체가 생기면
  //   if (observerTarget.current) {
  //     // 타겟 관측 시작
  //     observer.observe(observerTarget.current);
  //   }
  //   // 해당 컴포넌트 언마운트시 관측 중단
  //   return () => {
  //     if (observerTarget.current) {
  //       observer.unobserve(observerTarget.current);
  //     }
  //   };
  //   // 타겟에 변동이 생기면(마운트 되면) 이 부수효과 실행
  // }, [observerTarget, myFeeds]);
  console.log(myFeedData?.data.reviews);
  return (
    <>
      <TabContainer>
        <Tab variant="feeds" />
      </TabContainer>
      <ContentsContainer>
        <Profile
          level={userData?.userLevel}
          name={userData?.nickname}
          img={userData?.profileImage}
          description={userData?.introduction}
          age={userData?.ageRange}
          region={userData?.areaInterest}
          refetch={refetchUserData}
          clickShowAll={() => {}}
        />
        <FlexContainer>
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
          {selector === 1 ? (
            <>
              <MyFeeds myFeedData={myFeedData?.data.reviews} />
            </>
          ) : selector === 2 ? (
            ''
          ) : (
            <>
              <MyTeamList
                data={myTeamsData?.data?.teams}
                refetch={refetchTeamsData}
              />
            </>
          )}
        </FlexContainer>
        <div ref={observerTarget} />
      </ContentsContainer>
    </>
  );
}
