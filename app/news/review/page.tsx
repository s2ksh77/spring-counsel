import React from 'react';
import ReviewClient from './Review.client';
import client from '@libs/server/client';
import { fetchAPI } from '@libs/client/fetcher';

async function getReviews(page = 1) {
  const reviews = await fetchAPI(`/api/review?page=${page}`);
  return reviews;
}

const Review = async (url: { searchParams: { page: string } }) => {
  const curPage = parseInt(url.searchParams?.page || '1', 10);
  const data = await getReviews(curPage);
  return <ReviewClient data={data} />;
};

export default Review;
