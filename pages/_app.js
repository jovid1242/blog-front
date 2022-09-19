import "../styles/globals.css";
import { wrapper } from "../redux/store";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-3GPGC9LTM9"
      /> */}
      <Script id="ya-analytics">
        {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(90475706, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true
            });
          `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
