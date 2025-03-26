import matter from 'gray-matter';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

export const getAnalySis = async () => {
  const { content } = matter.read(`./static/education/analysis.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  return value;
};
