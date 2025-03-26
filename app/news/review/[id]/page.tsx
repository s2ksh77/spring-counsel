import { fetchAPI } from '@libs/client/fetcher';
import ReviewDetailClient from './ReviewDetail.client';
import { Review } from '@prisma/client';

async function getReviewDetail(id: string) {
  const review = await fetchAPI<Review>(`/api/review/${id}`, 'force-cache');
  return review;
}

const ReviewDetail = async ({ params }: { params: { id: string } }) => {
  const review = await getReviewDetail(params.id);

  return <ReviewDetailClient id={params.id} review={review} />;
};

export default ReviewDetail;
