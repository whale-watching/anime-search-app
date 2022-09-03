import type { AppProps } from "next/app";
import React from "react";
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);