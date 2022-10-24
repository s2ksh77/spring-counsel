/* eslint-disable @next/next/no-sync-scripts */
import { Description } from 'constants/description';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

// Next.js 를 감싸는 document를 custom하게 변경할 수 있다.
class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ko">
        <Head>
          <meta name="description" content={`${Description}`} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
          <script
            type="text/javascript"
            src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=r19hf0h6dl"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
