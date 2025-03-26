import React from 'react';
import NextHead from 'next/head';

const CustomHead = ({ title }: { title: string }) => {
  return (
    <NextHead>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
    </NextHead>
  );
};

export default CustomHead;
