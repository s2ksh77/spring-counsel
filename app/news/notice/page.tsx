import NoticeClient from './Notice.client';
import client from '@libs/server/client';

const Notice = async () => {
  const notices = await client.notice.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  return <NoticeClient notices={JSON.parse(JSON.stringify(notices))} isLogin={false} />;
};

export default Notice;
