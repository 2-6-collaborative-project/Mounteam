import useSearchMountainStore from '@/src/store/useSearchMountainStore';
import { useEffect } from 'react';
import styled from 'styled-components';
import mountainDataProps from '@/src/types/mountainDataProps';
import { useSearchParams } from 'next/navigation';
const Map = styled.div`
  width: 100%;
  height: 400px;
`;

export default function KakaoMap({
  mountainList,
  filteredItems,
}: {
  mountainList: mountainDataProps[];
  filteredItems: mountainDataProps[];
}) {
  const searchParams = useSearchParams().get('mountain');

  const { keyword, searchedMountain } = useSearchMountainStore();

  useEffect(() => {
    if (window.kakao?.maps) {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');

        const options = {
          center:
            searchedMountain && keyword !== ''
              ? new window.kakao.maps.LatLng(
                  searchedMountain.X좌표,
                  searchedMountain.Y좌표,
                )
              : new window.kakao.maps.LatLng(36.71069, 127.97434),
          level: searchedMountain && keyword !== '' ? 7 : 13,
        };

        const map = new window.kakao.maps.Map(container, options);

        let positions;

        if (filteredItems.length > 0) {
          positions = filteredItems?.map((list: mountainDataProps) => ({
            title: list.명산_이름,
            latlng: new window.kakao.maps.LatLng(list.X좌표, list.Y좌표),
          }));
        } else {
          positions = mountainList?.map((list: mountainDataProps) => ({
            title: list.명산_이름,
            latlng:
              searchedMountain && searchParams
                ? new window.kakao.maps.LatLng(
                    searchedMountain.X좌표,
                    searchedMountain.Y좌표,
                  )
                : new window.kakao.maps.LatLng(list.X좌표, list.Y좌표),
          }));
        }

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
    }
  }, [mountainList, , searchParams, searchedMountain, filteredItems]);

  return <Map id="map" />;
}
