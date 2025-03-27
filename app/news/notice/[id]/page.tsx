import { fetchAPI } from '@libs/client/fetcher';
import NoticeDetailClient from './NoticeDetail.client';
import { Notice } from '@prisma/client';

async function getNoticeDetail(id: string) {
  const notice = await fetchAPI<Notice>(`/api/notice/${id}`);
  return notice;
}

const NoticeDetail = async ({ params }: { params: { id: string } }) => {
  const notice = await getNoticeDetail(params.id);

  return <NoticeDetailClient id={params.id} notice={notice} />;
};

export default NoticeDetail;
