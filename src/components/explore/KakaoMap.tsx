import { useEffect, useState } from 'react';
import styled from 'styled-components';
import mountainData from './mountainData';
const Map = styled.div`
  width: 100%;
  height: 400px;
`;

interface mountainDataProps {
  X좌표: number;
  Y좌표: number;
  교통정보: string;
  명산_높이: number;
  명산_소재지: string;
  명산_이름: string;
}
export default function KakaoMap() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mountainDataList = await mountainData();

        window.kakao.maps.load(() => {
          const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
          const options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(36.71069, 127.97434), //지도의 중심좌표
            level: 13, //지도의 레벨(확대, 축소 정도)
          };

          const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

          const positions = mountainDataList.map((data: mountainDataProps) => ({
            title: data.명산_이름,
            latlng: new window.kakao.maps.LatLng(data.X좌표, data.Y좌표),
          }));

          // 마커 이미지의 이미지 주소입니다
          const imageSrc =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

          for (let i = 0; i < positions.length; i++) {
            // 마커 이미지의 이미지 크기 입니다
            const imageSize = new window.kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다
            const markerImage = new window.kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
            );

            // 마커를 생성합니다
            const marker = new window.kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: positions[i].latlng, // 마커를 표시할 위치
              title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              image: markerImage, // 마커 이미지
            });
          }
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return <Map id="map" />;
}
