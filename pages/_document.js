import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/default.min.css"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="/static/js/plugin.js"></script>
        <script src="/static/js/lightbox.js"></script>
        <script src="/static/js/scripts.js"></script>
      </body>
    </Html>
  );
}
