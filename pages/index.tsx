import type { NextPage } from 'next';
import Head from 'next/head';
import Main from './home';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>봄, 심리상담센터</title>
      </Head>
      <Main />
    </div>
  );
};

export default Home;
