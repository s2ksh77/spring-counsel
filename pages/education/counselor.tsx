import matter from 'gray-matter';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse/lib';
import { unified } from 'unified';
import { GetStaticProps } from 'next';
import { CounselorSubject } from 'static/education/counselor';
import { Fragment } from 'react';

const Counselor = ({ data, subject }) => {
  return (
    <div className="flex h-full w-full flex-col p-8">
      <div className="border-b-2 pb-8 text-3xl font-bold">상담자 교육</div>
      <span>
        <div className=" w-[100%] bg-white p-4">
          <div
            className="md-content text-lg text-[#5f727f]"
            dangerouslySetInnerHTML={{ __html: data }}
          />
        </div>
        <hr className="my-8" />
        <div>
          <span className="text-xl font-bold">수퍼비전의 중요성</span>
          <div className="mb-4 ml-12 flex flex-row">
            <div className="mt-8">
              <div className="text-[#878787]">
                수퍼비전을 통하여 상담자로서의 자질, 인격을 닦아 나가면서 구체적인 상담기술이 함께
                습득된다.
              </div>
              <div className="text-[#878787]">
                상담시간에 깨닫지 못한 내다자의 전이감정을 깨닫는데 도움이 된다.
              </div>
              <div className="text-[#878787]">구체적인 교정을 받을 수 있게 된다.</div>
              <div className="text-[#878787]">
                수퍼비전을 통해 자신의 문제를 깨닫게 되어 상담을 더욱 촉진시킨다.
              </div>
            </div>
          </div>
          <hr className="my-8" />
          <span className="text-xl font-bold">수퍼비전의 주제</span>
          {subject?.map((sub, idx) => (
            <Fragment key={`${sub}-${idx}`}>
              <div className="mb-4 mt-8 font-bold text-[#444]">{sub.title}</div>
              <div className="mb-4 ml-8 flex flex-row">
                <div>
                  <div className="text-[#878787]">{sub.content}</div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </span>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { content } = matter.read(`./static/education/counselor.md`);

  const { value } = await unified().use(remarkParse).use(remarkHtml).process(content);

  const subject = CounselorSubject;

  return {
    props: {
      data: value,
      subject,
    },
  };
};

export default Counselor;
