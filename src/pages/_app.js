import { Provider } from "react-redux";
import "../app/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import store from "@/store";

export default function MyApp({ Component, pageProps }) {
  return (
    // <Layout>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    // </Layout>
  );
}
