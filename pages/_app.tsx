import type { AppProps } from 'next/app';
import Header from '../components/common/Header';
import GlobalStyle from '../styles/GlobalStyle';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
