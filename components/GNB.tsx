import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';
import useSWR from 'swr';
import logo from '../public/logo-small.jpg';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import useMutation from '@libs/client/useMutation';

const GNB: NextPage<{
  loginState: boolean;
  setLoginState: React.Dispatch<SetStateAction<boolean>>;
}> = ({ loginState, setLoginState }) => {
  const { data } = useSWR('/api/login');
  const [isLogin, setIsLogin] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [logout, { data: logoutData }] = useMutation('/api/login/logout');
  const router = useRouter();

  const goLogIn = () => {
    router.push('/login');
  };

  const openDialog = () => {
    setDialogVisible(true);
  };

  const handleLogout = () => {
    logout('');
    setDialogVisible(false);
    setLoginState(false);
  };

  const handleClose = () => setDialogVisible(false);

  useEffect(() => {
    localStorage.setItem('isLogin', data?.ok);
    setIsLogin(data?.ok);
    console.log('로그인 후에 왜 안타', data?.ok);
  }, [data]);

  useEffect(() => {
    setIsLogin(loginState);
  }, [loginState]);

  useEffect(() => {
    if (logoutData && logoutData?.ok) {
      localStorage.removeItem('isLogin');
      setIsLogin(false);
    }
  }, [logoutData]);

  const removeCache = async (e: any) => {
    console.log(e);
    debugger;
    if (e.isTrusted) {
      await logout('');
      localStorage.removeItem('isLogin');
      setIsLogin(false);
    }
  };

  // todo beforeunload
  // useEffect(()=>{
  // if(window) window.addEventListener('beforeunload', removeCache);
  // return () => window.removeEventListener('beforeunload', removeCache);
  // return () => logout('');
  // },[])

  return (
    <div
      id="gnb"
      className="bg-black-400 border-#f5f5f5 fixed z-[2] flex h-28 w-[100%] flex-col border-b-2 bg-white"
    >
      <div className="mx-auto flex">
        <div className="flex">
          <Link href="/home">
            <a>
              <div
                id="logo"
                className="flex h-[112px] min-w-[350px] cursor-pointer overflow-y-hidden"
              >
                <div>
                  <Image src={logo} width={350} height={112} />
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-end">
            {!isLogin ? (
              <div id="login" className="padding-[0.5rem]">
                <button onClick={goLogIn} className="text-black-300 w-20 hover:text-gray-400">
                  로그인
                </button>
              </div>
            ) : (
              <div className="padding-[0.5rem]">
                <button onClick={openDialog} className="text-black-300 w-20 hover:text-gray-400">
                  로그아웃
                </button>
              </div>
            )}
          </div>
          <div id="menu" className="flex">
            <div className="mx-2 flex h-[5.3rem] w-52 cursor-pointer items-center justify-center font-medium  ">
              <div className="dropdown relative mx-2 inline-block h-[5.3rem] w-40">
                <div>
                  <div className="py-[2rem] text-center">
                    <Link href="/introduce">
                      <a>
                        <span className="font-bold">센터 소개</span>
                      </a>
                    </Link>
                  </div>
                  <ul className="dropdown-menu absolute mt-[1px] hidden min-w-[250px] bg-white py-1 text-sm text-[#777777] shadow-[0_6px_12px_rgb(0,0,0,0.3)] dark:text-gray-200">
                    <li>
                      <Link href="/introduce">
                        <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white" href="#">
                          센터 소개
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/introduce/member">
                        <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white">
                          센터 구성원 소개
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/introduce/location">
                        <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white" href="#">
                          찾아 오시는 길
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mx-2 flex h-[5.3rem] w-52 cursor-pointer items-center justify-center font-medium ">
              <div className="dropdown relative mx-2 inline-block h-[5.3rem] w-48">
                <div>
                  <div className="py-[2rem] text-center">
                    <Link href="/counsel/private">
                      <a>
                        <span className="font-bold">상담 및 심리검사 서비스</span>
                      </a>
                    </Link>
                  </div>
                  <ul className="dropdown-menu absolute mt-[1px] hidden min-w-[250px] bg-white py-1 text-sm  text-[#777777] shadow-[0_6px_12px_rgb(0,0,0,0.3)] dark:text-gray-200">
                    <li className="">
                      <Link href="/counsel/private">
                        <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white">
                          개인상담
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/counsel/family">
                        <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white">
                          부부 · 가족상담
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/counsel/group">
                        <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white" href="#">
                          집단상담
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/counsel/counseltest">
                        <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white" href="#">
                          심리검사
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mx-2 flex h-[5.3rem] w-52 cursor-pointer items-center justify-center font-medium ">
              <div className="dropdown relative mx-2 inline-block h-[5.3rem] w-40">
                <div>
                  <div className="py-[2rem] text-center">
                    <Link href="/education/counselor">
                      <a>
                        <span className="font-bold">교육 서비스</span>
                      </a>
                    </Link>
                  </div>
                  <ul className="dropdown-menu absolute  mt-[1px] hidden min-w-[250px] bg-white py-1 text-sm text-[#777777] shadow-[0_6px_12px_rgb(0,0,0,0.3)] dark:text-gray-200">
                    <li className="">
                      <Link href="/education/counselor">
                        <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white" href="#">
                          상담자 교육
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/education/analysis">
                        <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white" href="#">
                          교육분석
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mx-2 flex h-[5.3rem] w-52 cursor-pointer items-center justify-center font-medium ">
              <div className="dropdown relative mx-2 inline-block h-[5.3rem] w-40">
                <div>
                  <div className="py-[2rem] text-center">
                    <Link href="/proposal">
                      <a>
                        <span className="font-bold">상담문의 및 신청</span>
                      </a>
                    </Link>
                  </div>
                  <ul className="dropdown-menu absolute  mt-[1px] hidden min-w-[250px] bg-white py-1 text-sm text-[#777777] shadow-[0_6px_12px_rgb(0,0,0,0.3)] dark:text-gray-200">
                    <li className="">
                      <Link href="/proposal">
                        <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white" href="#">
                          상담신청 안내
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/proposal/reservationForm">
                        <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white" href="#">
                          상담신청
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mx-2 flex h-[5.3rem] w-52 cursor-pointer items-center justify-center font-medium ">
              <div className="dropdown relative mx-2 inline-block h-[5.3rem] w-40">
                <div>
                  <div className="py-[2rem] text-center">
                    <Link href="/news/notice">
                      <a>
                        <span className="font-bold">센터 소식</span>
                      </a>
                    </Link>
                  </div>
                  <ul className="dropdown-menu absolute  mt-[1px] hidden min-w-[250px] bg-white py-1 text-sm text-[#777777] shadow-[0_6px_12px_rgb(0,0,0,0.3)] dark:text-gray-200">
                    <li className="">
                      <Link href="/news/notice">
                        <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white" href="#">
                          공지사항
                        </a>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/news/review">
                        <a className="block px-4 py-6 hover:bg-[#a9ce8e] hover:text-white" href="#">
                          상담후기
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {isLogin ? (
              <div className="mx-2 flex h-[5.3rem] w-52 cursor-pointer items-center justify-center font-medium ">
                <div className="dropdown relative mx-2 inline-block h-[5.3rem] w-40">
                  <div>
                    <div className="py-[2rem] text-center">
                      <Link href="/proposal/list">
                        <a>
                          <span className="font-bold">상담 신청 내역</span>
                        </a>
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
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={handleLogout} autoFocus>
                  확인
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GNB;
