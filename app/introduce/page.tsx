'use client';
import { NextPage } from 'next';
import centerIntroduce from '../../assets/center_introduce.webp';
import {
  center1,
  center2,
  center3,
  center4,
  center5,
  center6,
} from '../../assets';
import Image from 'next/image';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useMap from '@libs/client/useMap';
import DirectionsTransitFilledOutlinedIcon from '@mui/icons-material/DirectionsTransitFilledOutlined';
import { PhoneInTalkOutlined } from '@mui/icons-material';

const Introduce: NextPage = () => {
  useMap();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex h-full flex-col gap-[12rem] overflow-y-auto sm:gap-[5rem] md:gap-[5rem]">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center" data-aos="fade-right">
          <p className="w-full border-b-[3px] border-t-[3px] py-4 text-center text-2xl font-semibold">
            센터장님 인사말
          </p>
        </div>
        <div className="flex h-full w-full justify-center" data-aos="fade-left">
          <Image
            src={centerIntroduce}
            sizes="640px 300px"
            alt="센터장님 소개"
            className="min-w-[300px]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-center" data-aos="fade-right">
          <p className="w-full border-b-[3px] border-t-[3px] py-4 text-center text-2xl font-semibold">
            센터 소개
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row pt-8">
            <div
              className="mr-auto w-[33%]"
              data-aos="fade-left"
              data-aos-delay="0"
            >
              <Image
                src={center1}
                alt="센터 내부 사진"
                sizes="150px 256px 600px"
              />
            </div>
            <div
              className="mr-auto w-[33%]"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <Image
                src={center2}
                alt="센터 내부 사진"
                sizes="150px 256px 600px"
              />
            </div>
            <div
              className="mr-auto w-[33%]"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <Image src={center3} alt="센터 내부 사진" />
            </div>
          </div>
          <div className="flex flex-row pt-8">
            <div
              className="mr-auto w-[33%]"
              data-aos="fade-right"
              data-aos-delay="0"
            >
              <Image src={center4} alt="센터 내부 사진" />
            </div>
            <div
              className="mr-auto w-[33%]"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <Image src={center6} alt="센터 내부 사진" />
            </div>
            <div
              className="mr-auto w-[33%]"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <Image src={center5} alt="센터 내부 사진" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-center" data-aos="fade-right">
          <p className="w-full border-b-[3px] border-t-[3px] py-4 text-center text-2xl font-semibold">
            찾아 오시는 길
          </p>
        </div>
        <div className="flex flex-row gap-8 sm:flex-col md:flex-col">
          <div
            className="flex w-[50%] flex-1 sm:w-[100%] sm:items-center sm:justify-center md:w-[100%] md:items-center md:justify-center "
            data-aos="fade-right"
          >
            <div
              id="map"
              className="h-[500px] w-[100%] sm:h-[350px] sm:w-[350px] sm:items-center md:w-[500px] md:items-center"
            ></div>
          </div>
          <div
            className="banner-title ml-10 flex flex-col justify-center"
            data-aos="fade-left"
          >
            <span className="mb-5 text-lg font-bold text-[#a9ce8e] sm:text-lg">
              봄, 심리상담센터
            </span>

            <span className="mb-5 text-lg font-bold tracking-widest sm:text-lg ">
              경기 수원시 영통구 영통로 498, 145동 101호
            </span>

            <span className="mb-5 text-lg tracking-widest sm:text-sm ">
              <DirectionsTransitFilledOutlinedIcon className="mr-10 h-12 w-12 text-[#454545]" />
              분당선 청명역 6번출구 (도보 5분 이내)
            </span>

            <div>
              <span className="mb-5 text-lg tracking-widest sm:text-sm">
                <PhoneInTalkOutlined className="mr-10 h-12 w-12 text-[#454545]" />
                010-6220-1850
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
