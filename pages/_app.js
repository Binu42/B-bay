import App from "next/app";
import Layout from '../components/_App/Layout'
import { parseCookies, destroyCookie } from 'nookies'
import { Redirect } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import Axios from "axios";
import Router from 'next/router'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // redirecting user from account and create route if not loggedIN.
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
        const user = response.data;
        // redirecting user from create route to home.
        const isAdmin = user.role === "admin";
        const isRoot = user.role === "root";
        const isNotPermited = (isAdmin || isRoot) && ctx.pathname === "/create";
        if (!isNotPermited) {
          Redirect(ctx, '/');
        }
        pageProps.user = user;
      } catch (error) {
        console.log("Error getting user Details", error);
        destroyCookie(ctx, 'token');
        Redirect(ctx, '/login');
      }
    }
    return { pageProps: pageProps };
  }

  componentDidMount() {
    window.addEventListener('storage', this.syncLogout);
  }

  syncLogout = event => {
    if (event.key === 'logout') {
      Router.push('/login');
    }
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
