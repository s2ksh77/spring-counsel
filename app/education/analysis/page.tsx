import { getAnalySis } from './getAnalySis';

const Analysis = async () => {
  const data = (await getAnalySis()) as string;
  return (
    <div className="flex h-full w-full flex-col p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">교육분석</div>
      <span>
        <div className="w-[100%] bg-white p-4">
          <div
            className="md-content text-lg text-[#5f727f]"
            dangerouslySetInnerHTML={{ __html: data }}
          />
        </div>
      </span>
    </div>
  );
};

export default Analysis;
