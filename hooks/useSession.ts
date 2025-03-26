'use client';
import useSWR, { mutate } from 'swr';
import { fetchAPI } from '@libs/client/fetcher';

export function useSession() {
  const { data, isLoading } = useSWR('/api/auth', fetchAPI, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    isLogin: data || false,
    isLoading,
    refreshSession: () => mutate('/api/auth', undefined, { revalidate: true }),
  };
}
