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
import { Review } from '@prisma/client';
import { withSsrSession } from '@libs/server/withSession';
import { useEffect, useState } from 'react';

interface ReviewResponse {
  ok: boolean;
  reviews: Review[];
}

const Review: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<ReviewResponse>('/api/review');
  const [isLogin, setIsLogin] = useState<any | false>(false);

  const onClick = () => {
    router.push('/news/review/reviewForm');
  };

  const handleReview = (id: string) => {
    router.push(`/news/review/${id}`);
  };

  useEffect(() => {
    const flag = localStorage.getItem('isLogin');
    setIsLogin(flag);
  }, []);

  return (
    <div className="h-full p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">상담후기</div>
      <TableContainer className="min-h-[85%]">
        <Table stickyHeader className="">
          <TableHead className="sticky">
            <TableRow>
              <TableCell className="w-16 text-center">번호</TableCell>
              <TableCell className="w-40">제목</TableCell>
              <TableCell className="w-[27rem]">내용</TableCell>
              <TableCell className="w-20 text-center">날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="">
            {data?.reviews?.map((review, index) => (
              <TableRow
                onClick={handleReview.bind(null, review.id)}
                key={review.id}
                className={'h-[30px] hover:cursor-pointer hover:bg-[#eeeeee]'}
              >
                <TableCell className="h-[30px] w-16 text-center">
                  {data?.reviews.length - index}
                </TableCell>
                <TableCell className="h-[30px]">{review.title}</TableCell>
                <TableCell className="h-[30px] max-w-[27rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {review.content
                    .replace(/[<][^>]*[>]|&nbsp;|&zwj;/gi, '')
                    .replace(/&lt;/gi, '<')
                    .replace(/&gt;/gi, '>')}
                </TableCell>
                <TableCell className="h-[30px] w-36 text-center">
                  {review.updatedAt.toString().split('T')[0]?.replaceAll('-', '.')}
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

export default Review;
