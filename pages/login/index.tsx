import useMutation from '@libs/client/useMutation';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';

interface LoginForm {
  userId: string;
  password: string;
}

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [login, { data, loading }] = useMutation<LoginForm>('/api/login');

  const onValid = (data: LoginForm) => {
    if (loading) return;
    login(data);
  };

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
                className="appearance-none rounded-md  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#a9ce8e] focus:outline-none focus:ring-[#a9ce8e]"
                type="text"
                defaultValue=""
              />
            </div>
            <div className="my-4 flex items-center">
              <label className="mr-4">비밀번호</label>
              <input
                {...register('password')}
                className="appearance-none rounded-md  border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#a9ce8e] focus:outline-none focus:ring-[#a9ce8e]"
                type="password"
                defaultValue=""
              />
            </div>
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
