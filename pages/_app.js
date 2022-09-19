import "../styles/globals.css";
import { wrapper } from "../redux/store";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-3GPGC9LTM9"
      />
      <Script id="ga-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3GPGC9LTM9');
          `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
