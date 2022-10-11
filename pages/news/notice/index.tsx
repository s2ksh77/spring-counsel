import Layout from '@components/Layout';
import { NextPage, NextPageContext } from 'next';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
} from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Notice } from '@prisma/client';
import { withSsrSession } from '@libs/server/withSession';
import { useEffect, useState } from 'react';

interface NoticeResponse {
  ok: boolean;
  notices: Notice[];
}

const Notice: NextPage = () => {
  const router = useRouter();
  const { data: loginData } = useSWR('/api/login');
  const { data } = useSWR<NoticeResponse>('/api/notice');
  const [sortedData, setSortedData] = useState<any | null>([
    {
      primary: [],
      normal: [],
    },
  ]);
  const [isLogin, setIsLogin] = useState<any | false>(false);

  const onClick = () => {
    router.push('/news/notice/noticeForm');
  };

  const handleNotice = (id: string) => {
    router.push(`/news/notice/${id}`);
  };

  const sortNoticeData = () => {
    const primary = data?.notices?.filter((notice) => notice.isPrimary === true);
    const normal = data?.notices?.filter((notice) => notice.isPrimary === false);
    setSortedData({ primary, normal });
  };

  useEffect(() => {
    sortNoticeData();
  }, [data]);

  useEffect(() => {
    if (loginData?.ok) {
      setIsLogin(loginData?.ok);
    }
  }, [loginData]);

  return (
    <div className="h-full p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">공지사항</div>
      <TableContainer className="min-h-[85%]">
        <Table stickyHeader className="">
          <TableHead className="sticky">
            <TableRow>
              <TableCell className="w-16 text-center sm:w-4">번호</TableCell>
              <TableCell className="sw:w-36">제목</TableCell>
              <TableCell className="w-20 text-center sm:w-4">작성자</TableCell>
              <TableCell className="w-36 text-center sm:w-4">날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="">
            {sortedData?.primary?.map((notice: any, index: any) => (
              <TableRow
                onClick={handleNotice.bind(null, notice.id)}
                key={notice.id}
                className={'h-[30px] bg-[#e6e6e6] hover:cursor-pointer hover:bg-[#eeeeee]'}
              >
                <TableCell className="h-[30px] w-16 text-center sm:w-4">공지</TableCell>
                <TableCell className="sw:w-36 h-[30px]">{notice.title}</TableCell>
                <TableCell className="h-[30px] w-20 text-center sm:w-4">{'관리자'}</TableCell>
                <TableCell className="h-[30px] w-36 text-center sm:w-4">
                  {notice.updatedAt.toString().split('T')[0]?.replaceAll('-', '.')}
                </TableCell>
              </TableRow>
            ))}
            {sortedData?.normal?.map((notice: any, index: any) => (
              <TableRow
                onClick={handleNotice.bind(null, notice.id)}
                key={notice.id}
                className={'h-[30px] hover:cursor-pointer hover:bg-[#eeeeee]'}
              >
                <TableCell className="h-[30px] w-16 text-center sm:w-4">
                  {sortedData?.normal?.length - index}
                </TableCell>
                <TableCell className="h-[30px] sm:w-36">{notice.title}</TableCell>
                <TableCell className="h-[30px] w-20 text-center sm:w-4">{'관리자'}</TableCell>
                <TableCell className="h-[30px] w-36 text-center sm:w-4">
                  {notice.updatedAt.toString().split('T')[0]?.replaceAll('-', '.')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLogin ? (
        <div className="float-right ml-auto flex">
          <Button onClick={onClick} style={{ color: 'black' }}>
            <EditOutlined />
            글쓰기
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Notice;
