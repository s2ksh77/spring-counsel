import React from 'react';
import ReviewClient from './Review.client';
import client from '@libs/server/client';

const Review = async (url: { searchParams: { page: string } }) => {
  const curPage = parseInt(url.searchParams?.page || '1', 10);

  const reviews = await client.review.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    include: {
      files: true,
    },
    skip: (curPage - 1) * 5,
    take: 5,
  });

  const totalReviews = await client.review.count();

  const data = {
    reviews: JSON.parse(JSON.stringify(reviews)),
    isLogin: false,
    curPage,
    maxPage: Math.ceil(totalReviews / 5),
  };

  return <ReviewClient data={data} />;
};

export default Review;
