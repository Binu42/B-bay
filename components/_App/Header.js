import { Menu, Icon, Image, Container } from 'semantic-ui-react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress';
import { handleLogout } from '../../utils/auth'

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();


function Header({ user }) {
  const router = useRouter();
  const isAdmin = user && user.role === "admin";
  const isRoot = user && user.role === "root";
  const isRootOrAdmin = isRoot || isAdmin;

  const isActive = (route) => {
    return route === router.pathname;
  }
  return (
    <Menu stackable fluid inverted id="menu">
      <Container text>
        <Link href="/">
          <Menu.Item active={isActive('/')}>
            <Image
              size="mini"
              src="/static/logo.svg"
              style={{ "marginRight": "1rem" }} />
            B-BAY
          </Menu.Item>
        </Link>
        <Link href="/cart">
          <Menu.Item active={isActive('/cart')}>
            <Icon
              name="cart"
              size="large"
            />
            CART
          </Menu.Item>
        </Link>
        {isRootOrAdmin && <Link href="/create">
          <Menu.Item active={isActive('/create')}>
            <Icon
              name="add"
              size="large"
            />
            CREATE
          </Menu.Item>
        </Link>}
        {
          user ?
            (<>
              <Link href="/account">
                <Menu.Item active={isActive('/account')}>
                  <Icon
                    name="user"
                    size="large"
                  />
                  ACCOUNT
                </Menu.Item>
              </Link>
              <Menu.Item onClick={handleLogout}>
                <Icon
                  name="sign out"
                  size="large"
                />
                LOGOUT
              </Menu.Item>
            </>)
            :
            (<>
              <Link href="/login">
                <Menu.Item active={isActive('/login')}>
                  <Icon
                    name="sign in"
                    size="large"
                  />
                  LOG IN
                </Menu.Item>
              </Link>
              <Link href="/signup">
                <Menu.Item active={isActive('/logout')}>
                  <Icon
                    name="signup"
                    size="large"
                  />
                  SIGN UP
                </Menu.Item>
              </Link>
            </>)
        }
      </Container>
    </Menu>
  );
}

export default Header;
