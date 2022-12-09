import useMutation from '@libs/client/useMutation';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface LoginForm {
  userId: string;
  password: string;
}

interface LoginResponse {
  ok: boolean;
  message?: string;
}

const Login: NextPage<{ setLoginState: React.Dispatch<SetStateAction<boolean>> }> = ({
  setLoginState,
}) => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<LoginForm>();
  const [login, { data, loading }] = useMutation<LoginResponse>('/api/login');
  const [error, setError] = useState(false);
  const passwordWatch = watch('password');

  const onValid = (form: LoginForm) => {
    if (form.userId === '' || form.password === '') return;
    if (loading) return;
    login(form);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push('/home');
      setLoginState(true);
    } else if (data?.message) setError(true);
  }, [data]);

  useEffect(() => {
    if (passwordWatch === '' && error) setError(false);
  }, [passwordWatch]);

  return (
    <div className="m-auto flex flex-col rounded-2xl border-[2px] py-16 px-16">
      <div className="border-b-2 pb-8 text-3xl font-bold">로그인</div>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-row">
          <div>
            <div className="my-4 flex items-center">
              <label className="mr-8">아이디</label>
              <input
                {...register('userId')}
                className="regist-form w-64"
                type="text"
                defaultValue=""
                autoFocus
              />
            </div>
            <div className="my-4 flex items-center">
              <label className="mr-4">비밀번호</label>
              <input
                {...register('password')}
                className="regist-form w-64"
                type="password"
                defaultValue=""
              />
            </div>
            {error ? (
              <label className="mr-4 text-red-500">아이디 및 비밀번호를 확인 해주세요.</label>
            ) : null}
          </div>
          <div className="flex items-center">
            <button className="ml-10 h-[60px] w-[150px] rounded-md border border-transparent  bg-[#a9ce8e] font-medium text-white shadow-sm hover:bg-[#a9ce8e] focus:outline-none focus:ring-2 focus:ring-[#a9ce8e] focus:ring-offset-2">
              로그인
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
