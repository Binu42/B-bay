import App from "next/app";
import Layout from '../components/_App/Layout'
import { parseCookies, destroyCookie } from 'nookies'
import { Redirect } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import Axios from "axios";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (!token) {
      const isProtectedRoute = ctx.pathname === '/account' || ctx.pathname === '/create';
      if (isProtectedRoute) {
        Redirect(ctx, '/login');
      }
    } else {
      try {
        const payload = { headers: { authorization: token } };
        const url = `${baseUrl}/api/account`;
        const response = await Axios.get(url, payload);
        pageProps.user = response.data;
      } catch (error) {
        console.log("Error getting user Details", error);
        destroyCookie(ctx, 'token');
        Redirect(ctx, '/login');
      }
    }
    return { pageProps: pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
