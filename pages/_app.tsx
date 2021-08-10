import { ContextProvider } from 'context/store';
import { AppProps } from 'next/app';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
// styles
import '../styles/globals.css';
import '../styles/reactDateRange.css';

const progressBar = new ProgressBar({
  size: 4,
  color: '#FF385C',
  className: 'z-50',
  delay: 100,
});

Router.events.on('routeChangeStart', progressBar.start);
Router.events.on('routeChangeComplete', progressBar.finish);
Router.events.on('routeChangeError', progressBar.finish);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
