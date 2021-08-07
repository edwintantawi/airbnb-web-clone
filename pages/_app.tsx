import { ContextProvider } from 'context/store';
import { AppProps } from 'next/app';
// styles-tailwindcss
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
