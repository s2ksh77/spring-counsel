import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse/lib';
import { unified } from 'unified';

const Analysis = ({ data }) => {
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

export const getStaticProps: GetStaticProps = async () => {
  const { content } = matter.read(`./static/education/analysis.md`);

  const { value } = await unified().use(remarkParse).use(remarkHtml).process(content);

  return {
    props: {
      data: value,
    },
  };
};

export default Analysis;
