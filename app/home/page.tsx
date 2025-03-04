import React from 'react';
import HomeClient from './Home.client';
import client from '@libs/server/client';
import { fetchAPI } from '@libs/client/fetcher';

async function getNotices() {
  const notices = await fetchAPI('/api/notice?take=5', 'force-cache');
  return notices;
}

const Home = async () => {
  const notices = await getNotices();
  return <HomeClient notices={notices} />;
};

export default Home;
