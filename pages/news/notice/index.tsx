import Layout from '@components/Layout';
import { NextPage } from 'next';
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
import useLogin from '@libs/client/useLogin';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Notice } from '@prisma/client';

interface NoticeResponse {
  ok: boolean;
  notices: Notice[];
}

const Notice: NextPage = () => {
  const router = useRouter();
  const isLogin = useLogin();
  const { data } = useSWR<NoticeResponse>('/api/notice');

  const onClick = () => {
    router.push('/news/notice/noticeForm');
  };

  const handleNotice = (id) => {
    router.push(`/news/notice/${id}`);
  };

  return (
    <div className="h-full p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">공지사항</div>
      <TableContainer className="min-h-[85%]">
        <Table stickyHeader className="">
          <TableHead>
            <TableRow>
              <TableCell className="w-16 text-center">번호</TableCell>
              <TableCell className="text-center">제목</TableCell>
              <TableCell className="w-20 text-center">작성자</TableCell>
              <TableCell className="w-36 text-center">날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="">
            {data?.notices?.map((notice, index) => (
              <TableRow
                onClick={handleNotice.bind(null, notice.id)}
                key={notice.id}
                className="h-[30px] hover:cursor-pointer hover:bg-[#eeeeee]"
              >
                <TableCell className="h-[30px] w-16 text-center">{index + 1}</TableCell>
                <TableCell className="h-[30px]">{notice.title}</TableCell>
                <TableCell className="h-[30px] w-20 text-center">{'관리자'}</TableCell>
                <TableCell className="h-[30px] w-36 text-center">
                  {notice.updatedAt.split('T')[0]?.replaceAll('-', '.')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLogin ? (
        <div className="float-right ml-auto flex">
          <Button onClick={onClick} className="text-black">
            <EditOutlined />
            글쓰기
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Notice;
