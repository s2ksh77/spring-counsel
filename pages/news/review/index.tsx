import { NextPage, NextPageContext } from 'next';
import { Button } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Image from 'next/image';
import client from '@libs/server/client';
import { withSsrSession } from '@libs/server/withSession';

const Review = ({ reviews, isLogin }) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/news/review/reviewForm');
  };

  const handleReview = (id: string) => {
    router.push(`/news/review/${id}`);
  };

  return (
    <div className="h-full p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">상담후기</div>
      {isLogin ? (
        <div className="float-right mt-4 ml-auto flex">
          <Button onClick={onClick} style={{ color: 'black' }}>
            <EditOutlined />
            글쓰기
          </Button>
        </div>
      ) : null}
      <div className="min-h-[85%]">
        <div className="border-1 flex w-full flex-col">
          {reviews?.map((review, index) => (
            <div
              onClick={handleReview.bind(null, review.id)}
              key={review.id}
              className={
                'flex flex-row p-[20px] hover:cursor-pointer hover:bg-[#eeeeee] sm:h-[270px]'
              }
            >
              <div className="flex w-[270px] min-w-[270px] items-center justify-center sm:w-[130px] sm:min-w-[130px] md:min-w-[250px]">
                {review.files.length > 0 && (
                  <Image
                    src={review.files[0]?.url}
                    alt={review.files[0]?.name}
                    width={250}
                    height={250}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <div className="mx-[20px]">
                  <span className="text-2xl font-semibold">{review.title}</span>
                  <div
                    className="my-[20px] h-[190px] overflow-hidden text-ellipsis whitespace-normal sm:h-[100px] sm:[webkit-line-clamp:4]"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 8,
                      wordBreak: 'break-all',
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {review.content
                      .replace(/[<][^>]*[>]|&nbsp;|&zwj;/gi, '')
                      .replace(/&lt;/gi, '<')
                      .replace(/&gt;/gi, '>')}
                  </div>
                </div>
                <div className="mx-[20px] flex text-[13px] text-[#a8a8a8]">
                  {'[관리자]  : ' + review.updatedAt.toString().split('T')[0]?.replaceAll('-', '.')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withSsrSession(async function ({ req }: NextPageContext) {
  const reviews = await client.review.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    include: {
      files: true,
    },
  });

  return {
    props: {
      reviews: JSON.parse(JSON.stringify(reviews)),
      isLogin: !!req?.session?.user?.id,
    },
  };
});

export default Review;
