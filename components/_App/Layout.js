import Head from 'next/head';
import { Container } from 'semantic-ui-react';

import Header from './Header';
import HeadContent from './HeadContent';
import Footer from './Footer';

function Layout({ children, user }) {
  return (
    <>
      <Head>
        <HeadContent />
        {/* Stylesheets */}
        <link rel='stylesheet' type='text/css' href='/static/styles.css' />
        <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
        <link
          rel='stylesheet'
          href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css'
        />
        <title>B-bay</title>
      </Head>
      <Header user={user} />
      <Container text style={{ padding: '1em 0' }}>
        {children}
      </Container>

      <Footer />
    </>
  );
}

export default Layout;
