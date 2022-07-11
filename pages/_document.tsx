import { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => {
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
      </Head>
      <body style={{ fontFamily: 'Nunito Sans, sans-serif', height: '100%' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
