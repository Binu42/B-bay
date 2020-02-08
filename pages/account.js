import AccountHeader from '../components/Account/AccountHeader'
import AccountOrders from '../components/Account/AccountOrders'
import AccountPermissions from '../components/Account/AccountPermissions'
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl'
import Axios from 'axios';

function Account({ user, orders }) {
  // console.log(orders)
  return <>
    <AccountHeader {...user} />
    <AccountOrders orders={orders} />
    {user.role === "root" && <AccountPermissions />}
  </>;
}

Account.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { orders: [] }
  }
  const url = `${baseUrl}/api/orders`
  const payload = { headers: { authorization: token } }
  const response = await Axios.get(url, payload);
  return response.data;
}

export default Account;
