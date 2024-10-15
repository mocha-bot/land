import { Head, Html, Main, NextScript } from 'next/document';

function MyDocument() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <meta property='og:title' content='Mocha Bot' key='meta-title' />
        <meta
          property='og:description'
          content='Mocha is a bot for multi-chat cross-server, This bot allows you to send messages to multiple channels at once. You can create a private or public channel and send messages to it. The bot also filters out messages from prohibits mentions.'
          key='meta-description'
        />
        <meta property='og:image' content='/assets/images/logo-mocha.png' />
        <meta property='og:locale' content='en_US' key='meta-locale' />
        <meta property='og:url' content='https://mocha-bot.xyz/' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
