import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../app/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import store, { persistor } from "@/store";
import Head from 'next/head'


export default function MyApp({ Component, pageProps }) {
  return (
    // <Layout>
    <Provider store={store}>
    <Head>
    <title>Hydra | Get E-visa the easy way</title>
    </Head>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
    // </Layout>
  );
}
