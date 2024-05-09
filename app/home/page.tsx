import React from 'react';
import HomeClient from './Home.client';
import client from '@libs/server/client';

const Home = async () => {
  const notices = await client.notice.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    take: 5,
  });

  return <HomeClient notices={notices} />;
};

export default Home;
