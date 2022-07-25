/* eslint-disable jsx-a11y/alt-text */
import Layout from '@components/Layout';
import { NextPage } from 'next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import test1 from '../assets/test1.jpg';
import test6 from '../assets/test6.jpg';
import test11 from '../assets/test1.png';
import test22 from '../assets/test2.png';
import test33 from '../assets/banner/Frame 13.png';
import test44 from '../assets/banner/Frame 28.png';
import test55 from '../assets/banner/Frame 29.png';
import test66 from '../assets/banner/Frame 32.png';
import test77 from '../assets/banner/Frame 35.png';
import test88 from '../assets/banner/Frame 36.png';
import aa from '../assets/banner/Frame 42.png';
import bb from '../assets/banner/Frame 44.png';
import cc from '../assets/banner/Frame 48.png';

const Section: NextPage = () => {
  return (
    <div className="h-[540px] pt-[112px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={test1} layout="fill" />
          <div className="parallax-bg">
            <div className="title" data-swiper-parallax="-300">
              <p>봄, 심리상담센터</p>
            </div>
            <div className="subtitle" data-swiper-parallax="-200">
              <p>마주보다.</p>
            </div>
            <div className="subtitle" data-swiper-parallax="-200">
              <p>마음을 보다.</p>
            </div>
            <div className="subtitle" data-swiper-parallax="-200">
              <p>새롭게 보다.</p>
            </div>
            <div className="text" data-swiper-parallax="-100">
              <p>
                봄, 은 이름에서 상담에서 다루어야 하는 과정이 그대로 표현되는 따뜻한 공간입니다.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={test55} layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={test66} layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={test88} layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={bb} layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={cc} layout="fill" objectFit="cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Section;
