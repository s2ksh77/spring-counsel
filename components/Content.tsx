import { NextPage } from 'next';

const Content: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className={
        'mx-14 w-full max-w-[calc(100%_-_112px)] sm:mx-0 sm:w-full sm:max-w-full md:mx-0 md:w-full md:max-w-full lg:w-full'
      }
    >
      {children}
    </div>
  );
};

export default Content;
