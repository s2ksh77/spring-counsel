import { AnalySisData } from 'constants/education';
import { GetStaticProps } from 'next';

const Analysis = ({ data }) => {
  return (
    <div className="flex h-full w-full flex-col p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">교육분석</div>
      <span>
        {data.map(({ content }) => (
          <div key={content} className="w-[100%] bg-white p-4">
            <div className="text-lg text-[#5f727f]" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        ))}
      </span>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: AnalySisData,
    },
  };
};

export default Analysis;
