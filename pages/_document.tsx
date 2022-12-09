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
          <meta property="og:title" content="봄, 심리상담센터" />
          <meta property="og:site_name" content="봄, 심리상담센터" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.bom-counseling.com/" />
          <meta property="og:description" content={`${Description}`} />
          <meta property="og:locale" content="ko_KR" />
          <meta
            property="og:image"
            content="https://spring-counsel.s3.ap-northeast-2.amazonaws.com/logo-main.jpg"
          />

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
