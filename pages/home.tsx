import useMap from '@libs/client/useMap';
import { AddCircleOutline } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Notice } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import center1 from '../assets/bom_center.jpg';
import center2 from '../assets/bom_center2.jpg';
import center3 from '../assets/bom_center3.jpg';
import center4 from '../assets/bom_center4.jpg';
import center5 from '../assets/bom_center5.jpg';
import center6 from '../assets/bom_center6.jpg';
import kakao from '../assets/i_kakao.png';
import client from '@libs/server/client';
import { withSsrSession } from '@libs/server/withSession';

const Home = ({ notices }: { notices?: Notice[] }) => {
  useMap();
  const router = useRouter();

  const handleNotice = (id: string) => {
    router.push(`/news/notice/${id}`);
  };

  return (
    <div className="flex w-full flex-col sm:w-full">
      <div className="mb-12 flex items-center justify-center text-3xl font-bold">센터 소식</div>
      <div className="mb-16 flex w-full flex-row sm:w-full">
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
                  {notices?.map((notice) => (
                    <TableRow
                      onClick={handleNotice.bind(null, notice.id)}
                      key={notice.id}
                      className="hover:cursor-pointer hover:bg-[#eeeeee]"
                    >
                      <TableCell className="h-[45px]">{notice.title}</TableCell>
                      <TableCell className="h-[45px] w-36 text-center">
                        {notice?.updatedAt?.toString().split('T')[0]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col sm:w-full">
        <div className="mb-12 mt-8 flex items-center justify-center text-3xl font-bold">
          상담신청 및 문의
        </div>
        <div className="mb-16 flex w-full flex-row justify-center">
          <div className="mr-16 h-[360px] w-[360px] rounded-3xl border-[1px] p-4 shadow-lg sm:ml-0 sm:mr-8 sm:max-w-[210px] md:mr-8 md:max-w-[300px] lg:mr-12">
            <div className="flex justify-between">
              <div className="mb-4 border-b-4 pb-4 text-2xl font-bold sm:text-lg">상담 문의</div>
              <div
                onClick={() => router.push('/proposal')}
                className="text-[#dddddd] hover:cursor-pointer"
              >
                <AddCircleOutline />
              </div>
            </div>
            <div className="px-4 sm:px-[0.5rem]">
              <div className="text-3xl font-bold text-red-400 sm:text-xl">010-6220-1850</div>
              <div className="mt-4 text-xl sm:text-lg">상담은 사전 예약제로 진행 됩니다.</div>
              <div className="mt-[1.5rem] px-2 sm:mt-4">
                <div className="text-2xl font-bold sm:text-xl">업무시간</div>
                <div className="mt-4 sm:text-sm md:text-sm">평일: 오전 10:00 – 오후 21:00</div>
                <div className="mt-2 sm:text-xs md:text-sm">주말: 상담자와 사전 협의 후 진행</div>
                <div className="mt-2 sm:text-sm md:text-sm">(토요일 ~ 일요일)</div>
              </div>
            </div>
          </div>
          <div className="h-[360px] w-[360px] rounded-3xl border-[1px] p-4 shadow-lg sm:ml-0 sm:w-[150px] md:max-w-[250px]">
            <div className="flex justify-between">
              <div className="mb-4 border-b-4 pb-4 text-2xl font-bold sm:text-lg">상담 신청</div>
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
                className="h-[75px] w-[220px] items-center rounded-full border border-transparent bg-[#a9ce8e]  font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a9ce8e] focus:ring-offset-2 sm:w-[120px]"
              >
                상담신청
                <span className="sm:hidden"> 바로가기</span>
              </button>
              <button
                onClick={() =>
                  window.open(
                    'http://pf.kakao.com/_jxggLb/friend',
                    '_blank',
                    'width=480, height=500, left=600, top=300'
                  )
                }
                className="mt-4 h-[75px] w-[220px] items-center rounded-full border border-transparent bg-[#fae100]  font-bold text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-[#fae100] focus:ring-offset-2 sm:w-[120px]"
              >
                <div className="flex flex-row p-2 sm:items-center">
                  <div className="flex sm:hidden">
                    <Image
                      src={kakao}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="카카오톡 채널 이미지"
                    />
                  </div>
                  <span className="ml-2 flex items-center sm:ml-[1.4rem]">카카오톡 </span>
                  <span className="flex items-center sm:hidden">신청하기</span>
                </div>
              </button>
              <button
                onClick={() => router.push('/news/review')}
                className="mt-4 h-[75px] w-[220px] items-center rounded-full border border-transparent bg-[#a9ce8e]  font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a9ce8e] focus:ring-offset-2 sm:w-[120px]"
              >
                상담후기
                <span className="sm:hidden"> 바로가기</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-12 mt-8 flex items-center justify-center text-3xl font-bold">
          센터 소개
        </div>

        <div className="col mr-auto flex h-[800px] w-[100%] border-y-[1px] p-4 shadow-lg sm:h-[450px] md:max-h-[650px] md:min-h-[450px]">
          <div className="flex flex-col">
            <div className="mb-4 flex w-[6.6rem] border-b-4 pb-4 text-2xl font-bold">센터 사진</div>
            <div className="flex flex-row pt-8">
              <div className="mr-auto w-[33%]">
                <Image src={center1} alt="센터 내부 사진" />
              </div>
              <div className="mr-auto w-[33%]">
                <Image src={center2} alt="센터 내부 사진" />
              </div>
              <div className="mr-auto w-[33%]">
                <Image src={center3} alt="센터 내부 사진" />
              </div>
            </div>
            <div className="flex flex-row pt-8">
              <div className="mr-auto w-[33%]">
                <Image src={center4} alt="센터 내부 사진" />
              </div>
              <div className="mr-auto w-[33%]">
                <Image src={center6} alt="센터 내부 사진" />
              </div>
              <div className="mr-auto w-[33%]">
                <Image src={center5} alt="센터 내부 사진" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-32 flex flex-col ">
        <div className="flex items-center justify-center text-3xl font-bold">찾아오시는 길</div>
        <div className="mx-auto mt-20 w-full">
          <div id="map" style={{ width: '80%', height: '500px', margin: 'auto' }} />
        </div>
        <span className="banner-title mx-auto mt-8 text-xl font-normal sm:mr-4 sm:text-sm">
          주소 : 경기 수원시 영통구 영통로 498, 145동 101호
        </span>
        <span className="banner-title text-m mx-auto mt-2 sm:text-sm">
          대중교통 이용: 분당선 청명역 6번출구 (도보 5분 이내)
        </span>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = withSsrSession(async () => {
  const notices = await client.notice.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    take: 5,
  });

  return {
    props: {
      notices: JSON.parse(JSON.stringify(notices)),
    },
  };
});
