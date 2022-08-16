import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/common/Header';
import GlobalStyle from '../styles/GlobalStyle';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>롤 전적 검색 OP.GG</title>
        <meta name="description" content="OP.GG 사전과제 입니다" />
        <link
          href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
