/* eslint-disable jsx-a11y/alt-text */
import Layout from '@components/Layout';
import { NextPage } from 'next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import fixed from '../assets/fixed.png';
import fixed2 from '../assets/fixed2.png';
import fixed3 from '../assets/fixed3.png';
import fixed4 from '../assets/fixed4.png';
import fixed5 from '../assets/fixed5.png';


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
          <Image src={fixed} layout="fill" />
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
          <Image src={fixed2} layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={fixed3} layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={fixed4} layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={fixed5} layout="fill" objectFit="cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Section;
