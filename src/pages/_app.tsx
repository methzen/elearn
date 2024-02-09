// i18n
import '../locales/i18n';

// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../styles/quill.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// ----------------------------------------------------------------------
import { Provider as ReduxProvider } from 'react-redux';
import { CacheProvider, EmotionCache } from '@emotion/react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
// utils
import createEmotionCache from '../utils/createEmotionCache';
// theme
import ThemeProvider from '../theme';
// locales
import ThemeLocalization from '../locales';
// components
import ProgressBar from '../components/progress-bar';
import SnackbarProvider from '../components/snackbar';
import { MotionLazyContainer } from '../components/animate';
import { ThemeSettings, SettingsProvider } from '../components/settings';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import { io } from "socket.io-client";

// Check our docs
// https://docs.minimals.cc/authentication/ts-version

import { AuthProvider } from '../auth/JwtContext';
import { store } from '../redux/store'; 
import { createContext } from 'react';
import { HOST_API_KEY } from 'src/config-global';
// ----------------------------------------------------------------------

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY as string);

const clientSideEmotionCache = createEmotionCache();
const clientReactQuery = new QueryClient()
type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export const SocketContext = createContext<any | null>(null);

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  var socket: any;
  socket = io(HOST_API_KEY, {
    transports: ['websocket']
 });

 socket.onAny((event:any, ...args) => {
  console.log(event, args);
});

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AuthProvider>
      <SocketContext.Provider value={socket}>
        <QueryClientProvider client={clientReactQuery}>
        <ReduxProvider store={store}>
          <SettingsProvider>
            <MotionLazyContainer>
              <ThemeProvider>
                <ThemeSettings>
                  <ThemeLocalization>
                    <SnackbarProvider>
                      <ProgressBar />
                      <Elements stripe={stripePromise}>
                      {getLayout(<Component {...pageProps} />)}
                      </Elements>
                    </SnackbarProvider>
                  </ThemeLocalization>
                </ThemeSettings>
              </ThemeProvider>
            </MotionLazyContainer>
          </SettingsProvider>
          </ReduxProvider>
        </QueryClientProvider>
      </SocketContext.Provider>
      </AuthProvider>
    </CacheProvider>
  );
}
