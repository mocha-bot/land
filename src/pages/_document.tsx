import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';

type MyDocumentProps = DocumentInitialProps & {
  locale?: string;
};

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<MyDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale };
  }

  render() {
    const { locale } = this.props;
    return (
      <Html lang={locale ?? 'en'}>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
