/* eslint-disable react/display-name */
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
import { Reservation } from '@prisma/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import React from 'react';
import { AccessTime, CheckCircleOutline, PendingActions } from '@mui/icons-material';
import { phoneFomatter } from 'utils/common';

interface ReservationResponse {
  ok: boolean;
  reservations: Reservation[];
}

const ProposalList: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<ReservationResponse>('/api/proposal');

  const onClick = () => {
    router.push('/news/notice/noticeForm');
  };

  const handleReservation = (id) => {
    router.push(`/proposal/${id}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span>
            <PendingActions className="mr-1 text-red-500" />
            접수 중
          </span>
        );
      case 'ready':
        return (
          <span>
            <AccessTime className="mr-1 text-orange-500" />
            대기
          </span>
        );
      case 'done':
        return (
          <span>
            <CheckCircleOutline className="mr-1 text-green-500" />
            예약완료
          </span>
        );
      default:
        return;
    }
  };

  return (
    <div className="h-full p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">상담 신청 내역</div>
      <TableContainer className="min-h-[85%]">
        <Table stickyHeader className="">
          <TableHead className="sticky">
            <TableRow>
              <TableCell className="w-16 text-center">번호</TableCell>
              <TableCell className="">신청자</TableCell>
              <TableCell className="">연락처</TableCell>
              <TableCell className="">신청 날짜</TableCell>
              <TableCell className="w-24 text-center">상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="">
            {data?.reservations?.map((reservation, index) => (
              <TableRow
                onClick={handleReservation.bind(null, reservation.id)}
                key={reservation.id}
                className={'h-[30px] hover:cursor-pointer hover:bg-[#eeeeee]'}
              >
                <TableCell className="h-[30px] w-16 text-center">{index + 1}</TableCell>
                <TableCell className="h-[30px]">{reservation.name}</TableCell>
                <TableCell className="h-[30px]">{phoneFomatter('0' + reservation.phone)}</TableCell>
                <TableCell className="h-[30px] w-36">
                  {reservation.createdAt.split('T')[0]?.replaceAll('-', '.')}
                </TableCell>
                <TableCell className="h-[30px] w-20 text-center">
                  {getStatusIcon(reservation.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {isLogin ? (
        <div className="float-right ml-auto flex">
          <Button onClick={onClick} className="text-black">
            <EditOutlined />
            글쓰기
          </Button>
        </div>
      ) : null} */}
    </div>
  );
};

export default ProposalList;