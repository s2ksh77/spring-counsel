import matter from 'gray-matter';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

const getEducationCounselor = async () => {
  const { content } = matter.read(`./static/education/counselor.md`);

  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);

  return value;
};

export default getEducationCounselor;
