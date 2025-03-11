/* eslint-disable jsx-a11y/alt-text */
import { NextPage } from 'next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import fixed from '../assets/fixed.webp';
import fixed2 from '../assets/fixed2.webp';
import fixed3 from '../assets/fixed3.webp';

const Section: NextPage = () => {
  return (
    <div className="h-[540px] pt-[202px] sm:h-[300px] sm:w-full sm:pt-[0px]">
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
        effect="fade"
        navigation={true}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src={fixed}
            className="swipe-image sm:w-full"
            priority
            alt="스와이프 이미지"
            sizes="320px 600px"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={fixed2}
            className="swipe-image sm:w-full"
            priority
            alt="스와이프 이미지"
            sizes="320px 600px"
          />
          <div className="parallax-bg banner-title sm:w-[100%] ">
            <div className="title sm:text-sm" data-swiper-parallax="-300">
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
            <div className="subtitle" data-swiper-parallax="-100">
              <p>
                봄, 은 이름에서 상담에서 다루어야 하는 과정이 그대로 표현되는 따뜻한 공간입니다.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={fixed3}
            className="swipe-image sm:w-full"
            priority
            alt="스와이프 이미지"
            sizes="320px 600px"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Section;
