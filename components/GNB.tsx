import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SetStateAction, useEffect, useState } from 'react';
import logo from '../public/logo-small.jpg';
import logoLarge from '../public/logo-main.jpg';
import kakao from '../assets/kakaotalk.svg';
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
import ContextMenu from './ContextMenu';
import { fetchAPI } from '@libs/client/fetcher';
import useSWR from 'swr';
import { useSession } from 'hooks/useSession';
import { PhoneInTalkOutlined, MenuOutlined } from '@mui/icons-material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

const KakaoSVG = () => {
  return (
    <svg width={32} height={32} viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#454545"
          d="M22.125 0H1.875C.839 0 0 .84 0 1.875v20.25C0 23.161.84 24 1.875 24h20.25C23.161 24 24 23.16 24 22.125V1.875C24 .839 23.16 0 22.125 0zM12 18.75c-.591 0-1.17-.041-1.732-.12-.562.396-3.813 2.679-4.12 2.722 0 0-.125.049-.232-.014s-.088-.229-.088-.229c.032-.22.843-3.018.992-3.533-2.745-1.36-4.57-3.769-4.57-6.513 0-4.246 4.365-7.688 9.75-7.688s9.75 3.442 9.75 7.688c0 4.245-4.365 7.687-9.75 7.687zM8.05 9.867h-.878v3.342c0 .296-.252.537-.563.537s-.562-.24-.562-.537V9.867h-.878a.552.552 0 0 1 0-1.101h2.88a.552.552 0 0 1 0 1.101zm10.987 2.957a.558.558 0 0 1 .109.417.559.559 0 0 1-.219.37.557.557 0 0 1-.338.114.558.558 0 0 1-.45-.224l-1.319-1.747-.195.195v1.227a.564.564 0 0 1-.562.563.563.563 0 0 1-.563-.563V9.328a.563.563 0 0 1 1.125 0v1.21l1.57-1.57a.437.437 0 0 1 .311-.126c.14 0 .282.061.388.167a.555.555 0 0 1 .165.356.438.438 0 0 1-.124.343l-1.282 1.281 1.385 1.835zm-8.35-3.502c-.095-.27-.383-.548-.75-.556-.366.008-.654.286-.749.555l-1.345 3.541c-.171.53-.022.728.133.8a.857.857 0 0 0 .357.077c.235 0 .414-.095.468-.248l.279-.73h1.715l.279.73c.054.153.233.248.468.248a.86.86 0 0 0 .357-.078c.155-.071.304-.268.133-.8l-1.345-3.54zm-1.311 2.443.562-1.596.561 1.596H9.376zm5.905 1.383a.528.528 0 0 1-.539.516h-1.804a.528.528 0 0 1-.54-.516v-3.82c0-.31.258-.562.575-.562s.574.252.574.562v3.305h1.195c.297 0 .54.231.54.515z"
        ></path>
      </g>
    </svg>
  );
};

const GNB: NextPage = () => {
  const { isLogin, refreshSession } = useSession();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [logout, { data: logoutData }] = useMutation('/api/login/logout');
  const router = useRouter();

  const goLogIn = () => router.push('/login');
  const openDialog = () => setDialogVisible(true);
  const handleClose = () => setDialogVisible(false);

  const handleLogin = () => {
    !isLogin ? router.push('/login') : openDialog();
  };

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
      <div className="flex flex-col sm:w-full sm:justify-between md:w-full md:justify-between lg:w-full xl:w-full">
        <div className="flex items-center justify-between px-16">
          <div className="flex cursor-default gap-2 rounded-full bg-[#a9ce8e] p-4 text-white">
            <PhoneInTalkOutlined />
            010-6220-1850
          </div>
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
          <div className="flex gap-4">
            <div className="flex min-w-[90px] cursor-pointer flex-col items-center p-4">
              <AssignmentOutlinedIcon className="h-8 w-8 text-[#454545]" />
              <Link href="/proposal/reservationForm">
                <span className="text-[#454545]">상담신청</span>
              </Link>
            </div>
            <div
              onClick={() =>
                window.open(
                  'http://pf.kakao.com/_jxggLb/friend',
                  '_blank',
                  'width=480, height=500, left=600, top=300'
                )
              }
            >
              <div className="flex min-w-[90px] cursor-pointer flex-col items-center p-4 ">
                <KakaoSVG />
                <span className="text-[#454545]">카카오톡</span>
              </div>
            </div>
            <div
              onClick={handleLogin}
              className="flex min-w-[90px] cursor-pointer flex-col items-center p-4"
            >
              <VpnKeyOutlinedIcon className="h-8 w-8 text-[#454545]" />
              <button>
                <span className="text-[#454545]">{isLogin ? '로그아웃' : '로그인'}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex bg-white">
          <div className="flex flex-1">
            <div id="menu" className="flex w-full flex-col justify-around sm:!hidden md:!hidden">
              <div id="menu-title" className="flex justify-center">
                <div className="menu-item flex flex-col">
                  <div className="w-full py-[2rem] text-center">
                    <Link href="/introduce">
                      <span className="text-xl font-medium">센터 소개</span>
                    </Link>
                  </div>
                  <ul className="menu-ul">
                    <li>
                      <Link href="/introduce" className="menu-dropdown-item text-base">
                        센터 소개
                      </Link>
                    </li>
                    <li>
                      <Link href="/introduce/member" className="menu-dropdown-item text-base">
                        센터 구성원 소개
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/introduce/location" className="menu-dropdown-item text-base">
                        찾아 오시는 길
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-item flex flex-col">
                  <div className="w-full py-[2rem] text-center">
                    <Link href="/counsel/private">
                      <span className="text-xl font-medium">상담 및 심리검사</span>
                    </Link>
                  </div>
                  <ul className="menu-ul ">
                    <li className="">
                      <Link href="/counsel/private" className="menu-dropdown-item text-base">
                        개인상담
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/counsel/family" className="menu-dropdown-item text-base">
                        부부 · 가족상담
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/counsel/group" className="menu-dropdown-item text-base">
                        집단상담
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/counsel/counseltest" className="menu-dropdown-item text-base">
                        심리검사
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-item flex flex-col">
                  <div className="w-full py-[2rem] text-center">
                    <Link href="/education/counselor">
                      <span className="text-xl font-medium">교육 서비스</span>
                    </Link>
                  </div>
                  <ul className="menu-ul">
                    <li className="">
                      <Link href="/education/counselor" className="menu-dropdown-item text-base">
                        상담자 교육
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/education/analysis" className="menu-dropdown-item text-base">
                        교육분석
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-item flex flex-col">
                  <div className="w-full py-[2rem] text-center">
                    <Link href="/proposal">
                      <span className="text-xl font-medium">상담문의 및 신청</span>
                    </Link>
                  </div>
                  <ul className="menu-ul">
                    <li className="">
                      <Link href="/proposal" className="menu-dropdown-item text-base">
                        상담신청 안내
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        href="/proposal/reservationForm"
                        className="menu-dropdown-item text-base"
                      >
                        상담신청
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="menu-item flex flex-col">
                  <div className="w-full py-[2rem] text-center">
                    <Link href="/news/notice">
                      <span className="text-xl font-medium">센터 소식</span>
                    </Link>
                  </div>
                  <ul className="menu-ul">
                    <li className="">
                      <Link href="/news/notice" className="menu-dropdown-item text-base">
                        공지사항
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/news/review" className="menu-dropdown-item text-base">
                        상담후기
                      </Link>
                    </li>
                  </ul>
                </div>
                {isLogin ? (
                  <div className="menu-item flex flex-col">
                    <div className="w-full py-[2rem] text-center">
                      <Link href="/proposal/list">
                        <span className="text-xl font-medium">상담 신청 내역</span>
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
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
    </div>
  );
};

export default GNB;
