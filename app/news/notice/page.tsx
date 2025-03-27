import { fetchAPI } from '@libs/client/fetcher';
import NoticeClient from './Notice.client';
import { Notice } from '@prisma/client';

async function getNotices() {
  const notices = await fetchAPI<Notice[]>('/api/notice');
  return notices;
}

const Notice = async () => {
  const notices = await getNotices();

  return <NoticeClient notices={notices} />;
};

export default Notice;
