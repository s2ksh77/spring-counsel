import { Button } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Introduce: NextPage = () => {
  const router = useRouter();
  return <div>상담신청 안내 페이지 입니다.</div>;
};

export default Introduce;
