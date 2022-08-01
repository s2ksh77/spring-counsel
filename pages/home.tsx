import useMap from '@libs/client/useMap';
import { AddCircleOutline } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Notice } from '@prisma/client';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import center1 from '../assets/center1.jpg';
import center2 from '../assets/center2.jpg';
import kakao from '../assets/i_kakao.png';

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

  const handleNotice = (id: string) => {
    router.push(`/news/notice/${id}`);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-12 flex items-center justify-center text-3xl font-bold">센터 소식</div>
      <div className="mb-16 flex w-full flex-row">
        <div className="mr-auto h-[360px] w-[100%] border-y-[1px] p-4 shadow-lg">
          <div className="flex justify-between">
            <div className="mb-4 border-b-4 pb-4 text-2xl font-bold">공지사항</div>
            <div
              onClick={() => router.push(`/news/notice`)}
              className="text-[#dddddd] hover:cursor-pointer"
            >
              <AddCircleOutline />
            </div>
          </div>
          <div className="max-h-[260px] overflow-y-auto">
            <TableContainer className="min-h-[85%]">
              <Table stickyHeader className="">
                <TableBody className="">
                  {data?.notices?.map((notice, index) => (
                    <TableRow
                      onClick={handleNotice.bind(null, notice.id)}
                      key={notice.id}
                      className="hover:cursor-pointer hover:bg-[#eeeeee]"
                    >
                      <TableCell className="h-[45px]">{notice.title}</TableCell>
                      <TableCell className="h-[45px] w-36 text-center">
                        {notice.updatedAt.toString().split('T')[0]?.replaceAll('-', '.')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col">
        <div className="mt-8 mb-12 flex items-center justify-center text-3xl font-bold">
          상담신청 및 문의
        </div>
        <div className="mb-16 flex w-full flex-row justify-center">
          <div className="mx-auto h-[360px] w-[360px] rounded-3xl border-[1px] p-4 shadow-lg">
            <div className="flex justify-between">
              <div className="mb-4 border-b-4 pb-4 text-2xl font-bold">상담 문의</div>
              <div
                onClick={() => router.push('/proposal')}
                className="text-[#dddddd] hover:cursor-pointer"
              >
                <AddCircleOutline />
              </div>
            </div>
            <div className="px-4">
              <div className="text-3xl font-bold text-red-400">010-4829-3961</div>
              <div className="mt-4 text-xl">상담은 사전 예약제로 진행 됩니다.</div>
              <div className="mt-[1.5rem] px-2">
                <div className="text-2xl font-bold">업무시간</div>
                <div className="mt-4">평일: 오전 10:00 – 오후 21:00</div>
                <div className="mt-2">주말: 상담자와 사전 협의 후 진행</div>
                <div className="mt-2">(토요일 ~ 일요일)</div>
              </div>
            </div>
          </div>
          <div className="mx-auto h-[360px] w-[360px] rounded-3xl border-[1px] p-4 shadow-lg">
            <div className="flex justify-between">
              <div className="mb-4 border-b-4 pb-4 text-2xl font-bold ">상담 신청</div>
              <div
                onClick={() => router.push('/proposal')}
                className="text-[#dddddd] hover:cursor-pointer"
              >
                <AddCircleOutline />
              </div>
            </div>
            <div className="flex h-[calc(100%_-_70px)] flex-col items-center justify-center">
              <button
                onClick={() => router.push('/proposal/reservationForm')}
                className="h-[75px] w-[220px] items-center rounded-full border border-transparent  bg-[#a9ce8e] font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a9ce8e] focus:ring-offset-2"
              >
                상담신청 바로가기
              </button>
              <button
                onClick={() =>
                  window.open(
                    'http://pf.kakao.com/_jxggLb/friend',
                    '_blank',
                    'width=480, height=500, left=600, top=300'
                  )
                }
                className="mt-4 h-[75px] w-[220px] items-center rounded-full border border-transparent  bg-[#fae100] font-bold text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-[#fae100] focus:ring-offset-2"
              >
                <div className="flex flex-row p-2">
                  <Image src={kakao} width={50} height={50} className="rounded-full" />
                  <span className="ml-2 flex items-center">카카오톡 신청하기</span>
                </div>
              </button>
              <button
                onClick={() => router.push('/news/review')}
                className="mt-4 h-[75px] w-[220px] items-center rounded-full border border-transparent  bg-[#a9ce8e] font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a9ce8e] focus:ring-offset-2"
              >
                상담후기 바로가기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-8 mb-12 flex items-center justify-center text-3xl font-bold">
          센터 소개
        </div>

        <div className="col mr-auto flex h-[630px] w-[100%] border-y-[1px] p-4 shadow-lg">
          <div className="flex flex-col">
            <div className="mb-4 flex w-[6.6rem] border-b-4 pb-4 text-2xl font-bold">센터 사진</div>
            <div className="flex flex-row pt-8">
              <div className="mr-auto w-[48%]">
                <Image src={center1} />
              </div>
              <div className="w-[48%]">
                <Image src={center2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-32 flex flex-col ">
        <div className="flex items-center justify-center text-3xl font-bold">찾아오시는 길</div>
        <div className="mx-auto mt-20 w-full">
          <div id="map" style={{ width: '80%', height: '500px', margin: 'auto' }}></div>
        </div>
        <span className="mt-8 text-xl font-bold">
          주소 : 경기 용인시 기흥구 흥덕중앙로 55 (흥덕역 리써밋 타워) 711호
        </span>
      </div>
    </div>
  );
};

export default Home;

// 6개 box
{
  /* <div className="mt-32">
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
</div> */
}
