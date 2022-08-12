import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Main from './home';
import Layout from '@components/Layout';
import Link from 'next/link';

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
