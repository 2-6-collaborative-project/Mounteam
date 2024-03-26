import { useEffect } from 'react';
import styled from 'styled-components';

const Map = styled.div`
  width: 100%;
  height: 400px;
`;

interface mountainDataProps {
  X좌표: number;
  Y좌표: number;
  명산_높이: number;
  명산_소재지: string;
  명산_이름: string;
}

export default function KakaoMap({
  mountainList,
  searchedMountain,
}: {
  mountainList: mountainDataProps[];
  searchedMountain: any;
}) {
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: searchedMountain
          ? new window.kakao.maps.LatLng(
              searchedMountain.X좌표,
              searchedMountain.Y좌표,
            )
          : new window.kakao.maps.LatLng(36.71069, 127.97434),
        level: searchedMountain ? 7 : 13,
      };

      const map = new window.kakao.maps.Map(container, options);

      const positions = mountainList?.map((list: mountainDataProps) => ({
        title: list.명산_이름,
        latlng: searchedMountain
          ? new window.kakao.maps.LatLng(
              searchedMountain.X좌표,
              searchedMountain.Y좌표,
            )
          : new window.kakao.maps.LatLng(list.X좌표, list.Y좌표),
      }));

      const imageSrc = '/markerSuccess.svg';

      for (let i = 0; i < positions?.length; i++) {
        const imageSize = new window.kakao.maps.Size(24, 35);

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
        );

        const marker = new window.kakao.maps.Marker({
          map: map,
          position: positions[i].latlng,
          title: positions[i].title,
          image: markerImage,
        });
      }
    });
  }, [mountainList, searchedMountain]);

  return <Map id="map" />;
}
