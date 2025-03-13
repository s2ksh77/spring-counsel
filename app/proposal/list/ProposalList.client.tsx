'use client';
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
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import React from 'react';
import { AccessTime, CheckCircleOutline, PendingActions } from '@mui/icons-material';
import { phoneFomatter } from 'utils/common';

export const statusIcons = {
  pending: {
    icon: <PendingActions className="mr-1 text-red-500" />,
    label: '접수 중',
  },
  ready: {
    icon: <AccessTime className="mr-1 text-orange-500" />,
    label: '대기',
  },
  done: {
    icon: <CheckCircleOutline className="mr-1 text-green-500" />,
    label: '예약완료',
  },
};

const ProposalListClient: NextPage = ({ data }) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/news/notice/noticeForm');
  };

  const handleReservation = (id: any) => {
    router.push(`/proposal/${id}`);
  };

  const getStatusIcon = (status: keyof typeof statusIcons) => {
    const statusData = statusIcons[status];
    return statusData ? (
      <span>
        {statusData.icon}
        {statusData.label}
      </span>
    ) : null;
  };

  return (
    <div className="h-full p-8 pt-4">
      <div className="border-b-2 pb-8 text-3xl font-bold">상담 신청 내역</div>
      <TableContainer className="min-h-[85%]">
        <Table stickyHeader>
          <TableHead className="sticky">
            <TableRow>
              <TableCell className="w-16 text-center">번호</TableCell>
              <TableCell>신청자</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>신청 날짜</TableCell>
              <TableCell>수정 날짜</TableCell>
              <TableCell className="w-40 text-center">상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((reservation, index) => (
              <TableRow
                onClick={handleReservation.bind(null, reservation.id)}
                key={reservation.id}
                className={'h-[30px] hover:cursor-pointer hover:bg-[#eeeeee]'}
              >
                <TableCell className="h-[30px] w-16 text-center">{data?.length - index}</TableCell>
                <TableCell className="h-[30px]">{reservation.name}</TableCell>
                <TableCell className="h-[30px]">
                  {phoneFomatter('0' + reservation.phone, '')}
                </TableCell>
                <TableCell className="h-[30px] w-36">
                  {reservation.createdAt.toString().split('T')[0]?.replaceAll('-', '.')}
                </TableCell>
                <TableCell className="h-[30px] w-36">
                  {reservation.updatedAt.toString().split('T')[0]?.replaceAll('-', '.')}
                </TableCell>
                <TableCell className="h-[30px] w-40 text-center">
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

export default ProposalListClient;
