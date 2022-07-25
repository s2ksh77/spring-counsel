import Layout from '@components/Layout';
import useMap from '@libs/client/useMap';
import { AddCircleOutline } from '@mui/icons-material';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Notice } from '@prisma/client';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import center1 from '../assets/center1.jpg';
import center2 from '../assets/center2.jpg';
import frame from '../assets/banner/Frame 49.png';

interface NoticeResponse {
  ok: boolean;
  notices: Notice[];
}

const Home: NextPage = () => {
  useMap();
  const router = useRouter();
  const { data } = useSWR<NoticeResponse>('/api/notice');

  const goNotice = () => {
    router.push(`/news/notice`);
  };

  const handleNotice = (id) => {
    router.push(`/news/notice/${id}`);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row">
        <div className="mr-auto h-[360px] w-[360px] rounded-3xl border-[1px] p-4">
          <div className="flex justify-between">
            <div className="mb-4 text-2xl font-bold">공지사항</div>
            <div
              onClick={() => router.push(`/news/notice`)}
              className="text-[#dddddd] hover:cursor-pointer"
            >
              <AddCircleOutline />
            </div>
          </div>
          <div className="max-h-[280px] overflow-y-auto">
            <TableContainer className="min-h-[85%]">
              <Table stickyHeader className="">
                <TableHead className="sticky">
                  <TableRow>
                    <TableCell className="">제목</TableCell>
                    <TableCell className="w-20 text-center">날짜</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="">
                  {data?.notices?.map((notice, index) => (
                    <TableRow
                      onClick={handleNotice.bind(null, notice.id)}
                      key={notice.id}
                      className={
                        notice.isPrimary
                          ? 'h-[30px] bg-[#e6e6e6] hover:cursor-pointer hover:bg-[#eeeeee]'
                          : 'h-[30px] hover:cursor-pointer hover:bg-[#eeeeee]'
                      }
                    >
                      <TableCell className="h-[45px]">{notice.title}</TableCell>
                      <TableCell className="h-[45px] w-20 text-center">
                        {notice.updatedAt.split('T')[0]?.replaceAll('-', '.')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="mr-auto h-[360px] w-[360px] rounded-3xl border-[1px] p-4">
          <div className="flex justify-between">
            <div className="mb-4 text-2xl font-bold">센터 소개</div>
            <div
              onClick={() => router.push('/introduce')}
              className="text-[#dddddd] hover:cursor-pointer"
            >
              <AddCircleOutline />
            </div>
          </div>
          <div>
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide>
                <Image src={center1} />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={center2} />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="h-[360px] w-[360px] rounded-3xl border-[1px] p-4">
          <div className="flex justify-between">
            <div className="mb-4 text-2xl font-bold">상담 문의</div>
            <div
              onClick={() => router.push('/proposal')}
              className="text-[#dddddd] hover:cursor-pointer"
            >
              <AddCircleOutline />
            </div>
          </div>
          <div className="text-3xl font-bold text-red-400">010-4829-3961</div>
          <div className="mt-1 text-xl">Fax: 031-000-0000</div>
          <div className="mt-8 px-4">
            <div className="text-2xl font-bold">업무시간</div>
            <div className="mt-4">평일: 10:00 – 20:00</div>
            <div className="mt-2">토요일: 10:00 – 15:00</div>
            <div className="mt-2">휴무일: 일요일, 공휴일</div>
          </div>
        </div>
      </div>

      <div className="mt-32">
        <div className="mt-8 flex items-center justify-center text-3xl font-bold">심리 상담</div>
        <div className="mt-8 flex w-full flex-row">
          <div className="mx-auto h-[250px] w-[250px] rounded-3xl border-[1px] bg-white p-4 hover:cursor-pointer hover:border-[2px] hover:border-[#a9ce8e]">
            <div className="font-xl p-2 font-semibold text-[#a9ce8e]">개인상담</div>
          </div>
          <div className="mr-auto h-[250px] w-[250px] rounded-3xl border-[1px] bg-white p-4 hover:cursor-pointer hover:border-[2px] hover:border-[#a9ce8e]">
            <div className="font-xl p-2 font-semibold text-[#a9ce8e]">커플·부부상담</div>
          </div>
          <div className="mr-auto h-[250px] w-[250px] rounded-3xl border-[1px] bg-white p-4 hover:cursor-pointer hover:border-[2px] hover:border-[#a9ce8e]">
            <div className="font-xl p-2 font-semibold text-[#a9ce8e]">집단상담</div>
          </div>
          <div className="mr-auto h-[250px] w-[250px] rounded-3xl border-[1px] bg-white p-4 hover:cursor-pointer hover:border-[2px] hover:border-[#a9ce8e]">
            <div className="font-xl p-2 font-semibold text-[#a9ce8e]">심리검사</div>
          </div>
        </div>
        <div className="my-8 flex w-full flex-row">
          <div className="mx-auto h-[250px] w-[250px] rounded-3xl border-[1px] bg-white p-4 hover:cursor-pointer hover:border-[2px] hover:border-[#a9ce8e]">
            <div className="font-xl p-2 font-semibold text-[#a9ce8e]">상담자 교육</div>
          </div>
          <div className="mr-auto h-[250px] w-[250px] rounded-3xl border-[1px] bg-white p-4 hover:cursor-pointer hover:border-[2px] hover:border-[#a9ce8e]">
            <div className="font-xl p-2 font-semibold text-[#a9ce8e]">교육분석</div>
          </div>
        </div>
      </div>

      <div className="my-32 flex flex-col ">
        <div className="flex items-center justify-center text-3xl font-bold">찾아오시는 길</div>
        <div className="mx-auto mt-20 w-full">
          <div id="map" style={{ width: '100%', height: '500px' }}></div>
        </div>
        <span className="mt-8 text-2xl font-bold">
          주소 : 경기 용인시 기흥구 흥덕중앙로 55 (흥덕역 리써밋 타워) 711호
        </span>
      </div>
    </div>
  );
};

export default Home;
