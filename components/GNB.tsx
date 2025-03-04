import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SetStateAction, useEffect, useState } from 'react';
import logo from '../public/logo-small.jpg';
import logoLarge from '../public/logo-main.jpg';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Menu,
} from '@mui/material';
import useMutation from '@libs/client/useMutation';
import { MenuOutlined } from '@mui/icons-material';
import ContextMenu from './ContextMenu';
import { fetchAPI } from '@libs/client/fetcher';
import useSWR from 'swr';
import { useSession } from 'hooks/useSession';

const GNB: NextPage = () => {
  const { isLogin, refreshSession } = useSession();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [logout, { data: logoutData }] = useMutation('/api/login/logout');
  const router = useRouter();

  const goLogIn = () => router.push('/login');
  const openDialog = () => setDialogVisible(true);
  const handleClose = () => setDialogVisible(false);

  const handleLogout = () => {
    logout('');
    setDialogVisible(false);
  };

  useEffect(() => {
    if (logoutData?.ok) {
      refreshSession();
    }
  }, [logoutData]);

  return (
    <div id="gnb" className="gnb bg-black-400 border-#f5f5f5">
      <div className="flex sm:w-full sm:justify-between md:w-full md:justify-between lg:w-full xl:w-full">
        <div className="flex-1-auto flex">
          <Link href="/home">
            <div
              id="logo"
              className="flex h-[112px] min-w-[350px] cursor-pointer overflow-y-hidden sm:h-[75px] sm:w-[130px] sm:min-w-[230px] lg:h-[112px] lg:w-[225px] lg:min-w-[225px]"
            >
              <div className="lg:hidden lg:h-[110px]">
                <Image
                  src={logo}
                  width={350}
                  height={112}
                  className="lg:h-[110px]"
                  priority
                  alt="봄, 심리상담센터 로고"
                />
              </div>
              <div className="hidden lg:flex lg:h-[112px]">
                <Image
                  src={logo}
                  width={225}
                  height={112}
                  className="lg:h-[112px]"
                  alt="봄, 심리상담센터 로고"
                />
              </div>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex justify-end">
            {!isLogin ? (
              <div id="login" className="padding-[0.5rem]">
                <button onClick={goLogIn} className="login-btn text-black-300">
                  로그인
                </button>
              </div>
            ) : (
              <div className="padding-[0.5rem]">
                <button onClick={openDialog} className="login-btn text-black-300">
                  로그아웃
                </button>
              </div>
            )}
          </div>
          <div id="menu" className="flex w-full justify-around sm:!hidden md:!hidden">
            <div className="menu-item">
              <div className="menu-dropdown dropdown">
                <div>
                  <div className="py-[2rem] text-center">
                    <Link href="/introduce">
                      <span className="font-bold">센터 소개</span>
                    </Link>
                  </div>
                  <ul className="dropdown-menu menu-dropdown-ul absolute">
                    <li>
                      <Link href="/introduce" className="menu-dropdown-item">
                        센터 소개
                      </Link>
                    </li>
                    <li>
                      <Link href="/introduce/member" className="menu-dropdown-item">
                        센터 구성원 소개
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/introduce/location" className="menu-dropdown-item">
                        찾아 오시는 길
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-dropdown dropdown">
                <div>
                  <div className="py-[2rem] text-center">
                    <Link href="/counsel/private">
                      <span className="font-bold">상담 및 심리검사 서비스</span>
                    </Link>
                  </div>
                  <ul className="dropdown-menu menu-dropdown-ul absolute">
                    <li className="">
                      <Link href="/counsel/private" className="menu-dropdown-item">
                        개인상담
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/counsel/family" className="menu-dropdown-item">
                        부부 · 가족상담
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/counsel/group" className="menu-dropdown-item">
                        집단상담
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/counsel/counseltest" className="menu-dropdown-item">
                        심리검사
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-dropdown dropdown">
                <div>
                  <div className="py-[2rem] text-center">
                    <Link href="/education/counselor">
                      <span className="font-bold">교육 서비스</span>
                    </Link>
                  </div>
                  <ul className="dropdown-menu menu-dropdown-ul absolute">
                    <li className="">
                      <Link href="/education/counselor" className="menu-dropdown-item">
                        상담자 교육
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/education/analysis" className="menu-dropdown-item">
                        교육분석
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="menu-item">
              <div className="menu-dropdown dropdown">
                <div>
                  <div className="py-[2rem] text-center">
                    <Link href="/proposal">
                      <span className="font-bold">상담문의 및 신청</span>
                    </Link>
                  </div>
                  <ul className="dropdown-menu menu-dropdown-ul absolute">
                    <li className="">
                      <Link href="/proposal" className="menu-dropdown-item">
                        상담신청 안내
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/proposal/reservationForm" className="menu-dropdown-item">
                        상담신청
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="menu-item">
              <div className="dropdown relative mx-2 inline-block h-[5.3rem] w-40 lg:w-24">
                <div>
                  <div className="py-[2rem] text-center">
                    <Link href="/news/notice">
                      <span className="font-bold">센터 소식</span>
                    </Link>
                  </div>
                  <ul className="dropdown-menu menu-dropdown-ul absolute">
                    <li className="">
                      <Link href="/news/notice" className="menu-dropdown-item">
                        공지사항
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/news/review" className="menu-dropdown-item">
                        상담후기
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {isLogin ? (
              <div className="menu-item">
                <div className="menu-dropdown dropdown">
                  <div>
                    <div className="py-[2rem] text-center">
                      <Link href="/proposal/list">
                        <span className="font-bold">상담 신청 내역</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <Dialog
              open={dialogVisible}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{'로그아웃'}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  로그아웃 하시겠습니까?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} style={{ color: 'black' }}>
                  취소
                </Button>
                <Button onClick={handleLogout} autoFocus style={{ color: 'black' }}>
                  확인
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <ContextMenu />
        </div>
      </div>
    </div>
  );
};

export default GNB;
