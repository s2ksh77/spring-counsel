import { useEffect, useRef, useState } from 'react';
import img from '../../assets/marker.svg';

function useMap() {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const markerRef = useRef<any | null>(null);
  const [myLocation, setMyLocation] = useState<{ latitude: number; longitude: number } | string>(
    ''
  );

  const markerClickEvent = (marker: any) => {
    naver.maps.Event.addListener(marker, 'click', (e: any) => {
      const mapLatLng = new naver.maps.LatLng(37.2626177, 127.0797463);

      // 선택한 마커로 부드럽게 이동합니다.
      mapRef.current.panTo(mapLatLng, e?.coord);
      mapRef.current.setCenter(new naver.maps.LatLng(37.2626177, 127.0797463));
      if (mapRef.current.zoom !== 19) mapRef.current.setZoom(19, true);
    });
  };

  useEffect(() => {
    // geolocation 이용 현재 위치 확인, 위치 미동의 시 기본 위치로 지정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({ latitude: 37.2626177, longitude: 127.0797463 });
      });
    }
    setMyLocation({ latitude: 37.2626177, longitude: 127.0797463 });
  }, []);

  useEffect(() => {
    if (typeof myLocation !== 'string') {
      // 현재 위치 추적
      let currentPosition = [myLocation.latitude, myLocation.longitude];

      // Naver Map 생성
      mapRef.current = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(myLocation.latitude, myLocation.longitude),
        zoom: 19,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      });

      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.2626177, 127.0797463),
        map: mapRef.current,
        title: '봄, 심리상담센터',
        icon: {
          content: [
            `
            <div style="display: flex; padding: 9px; border-radius: 35px; border: 1px solid #0475f4; background: #fff;">
              <img alt="marker" src=${img.src} width="28px" height="28px" />
              <div class="banner-title" style="display: flex; background: white; align-items:center; margin-left:8px; border-radius: 23px; font-size:14px; font-weight:normal">봄, 심리상담센터</div>
            </div>
          `,
          ].join(''),
          size: new naver.maps.Size(90, 90),
          anchor: new naver.maps.Point(58, 58),
        },
      });
      markerClickEvent(markerRef.current);
    }
  }, [myLocation]);

  return {
    myLocation,
  };
}

export default useMap;
