import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';
import ProgressIndicator from 'components/common/ProgressLoading';
import config, { persistor } from 'redux/store';
import SEO from 'components/common/SEO';
import { useMediaQuery } from 'react-responsive';
import 'styles/main.scss';
// import 'containers/comingSoon/index.scss';
import AuthRoutes from 'utils/Auth';
import SignalRContainer from 'components/signalR';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'components/common/ErrorBoundary';

declare global {
  interface Window {
    share: any;
  }
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { seoInfo = {} } = pageProps;
  const router = useRouter();
  // const hubConnection = useSignalR();
  useEffect(() => {
    // if (router.pathname !== '/') {
    //   router.replace('/');
    // }
  }, []);
  // if (isMobile) {
  //   return router.replace('https://m.shopdi.io/') as any;
  // }

  useEffect(() => {
    const sdiaf = router.query?.ref;
    if (sdiaf) {
      localStorage.setItem('shopdi-connect', String(sdiaf));
    }
  }, [router.query]);

  return (
    <>
      <Script
        strategy="lazyOnload"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-H9RC8VVVH8"
      />
      <Script strategy="lazyOnload" id="google">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-H9RC8VVVH8', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>

      <SEO seoInfo={seoInfo} />
      <ProgressIndicator />
      <Toaster position="top-center" />
      <Provider store={config}>
        <SignalRContainer />
        <PersistGate
          loading={<Component {...pageProps} />}
          persistor={persistor}
        />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AuthRoutes>
            <Component {...pageProps} />
          </AuthRoutes>
        </ErrorBoundary>
      </Provider>
    </>
  );
};

export default MyApp;
