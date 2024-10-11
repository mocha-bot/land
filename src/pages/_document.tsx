import { Head, Html, Main, NextScript } from 'next/document';

function MyDocument() {
  return (
    <Html>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap'
          rel='stylesheet'
        />
        <meta property='og:title' content='Mocha Bot' key='meta-title' />
        <meta
          property='og:description'
          content='Drink mocha with people across the universe.'
          key='meta-description'
        />
        <meta property='og:image' content='/assets/images/logo-mocha.png' />
        <meta property='og:locale' content='en_US' key='meta-locale' />
        <meta property='og:url' content='https://mocha-bot.xyz/' />
      </Head>
      <body
        style={{
          fontFamily: 'Nunito Sans, sans-serif',
          height: 'full',
        }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
