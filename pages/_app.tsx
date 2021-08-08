import { ContextProvider } from 'context/store';
import { AppProps } from 'next/app';
// styles
import '../styles/globals.css';
import '../styles/reactDateRange.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
