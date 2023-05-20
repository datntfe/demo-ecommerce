/* eslint-disable @next/next/no-document-import-in-page */
// #region Global Imports
import * as React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// #endregion Global Imports

class WebAppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<any> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="vi">
        <Head>
          <meta
            property="og:image"
            content="https://shopdi.io/img/meta-image.jpg"
          />
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no"
          />
          <meta property="og:image:alt" content="shopdi" />
          <meta property="og:site_name" content="Shopdi" />
          <meta property="og:type" content="website" />
          <meta name="theme-color" content="#000000" />
          <meta name="author" content="Shopdi JSC" />
          <meta name="copyright" content="Shopdi JSC" />
          <meta property="og:locale" content="locale" />
          <meta name="revisit-after" content="1 days" />
          <link rel="manifest preconnect" href="/manifest.json" />
          {/* <link rel="icon" type="image/png" href="/icons/favicon.ico" /> */}
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="48x48"
            href="/icons/favicon-48x48.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="128x128"
            href="/icons/favicon-128x128.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="196x196"
            href="/icons/favicon-196x196.png"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <link
            href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default WebAppDocument;
