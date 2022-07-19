import { useEffect, useState } from 'react';

export default function useLogin() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(localStorage.getItem('isLogin'));

    function handleChangeStorage() {
      setIsLogin(JSON.parse(localStorage.getItem('isLogin')));
    }

    window.addEventListener('storage', handleChangeStorage);
    return () => window.removeEventListener('storage', handleChangeStorage);
  }, []);

  return isLogin;
}
