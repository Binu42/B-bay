import { useState, useEffect, useRef } from 'react'
import cookie from 'js-cookie'
import axios from 'axios'
import { Header, Icon, Table, Checkbox, Tab } from 'semantic-ui-react'
import baseUrl from '../../utils/baseUrl'
import formatDate from '../../utils/formatDate'

function AccountPermissions() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    const url = `${baseUrl}/api/users`;
    const token = cookie.get('token');
    const payload = { headers: { authorization: token } };
    const response = await axios.get(url, payload);
    setUsers(response.data);
  }
  return (
    <div style={{ margin: '2em 0' }}>
      <Header as="h2">
        <Icon name="setting" />
        User Permissions
      </Header>
      <Table compact celled selectable color="teal">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Toggle</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined On</Table.HeaderCell>
            <Table.HeaderCell>Updated On</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <UserPermission key={user._id} user={user} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

function UserPermission({ user }) {
  const [admin, setAdmin] = useState(user.role === "admin");
  // console.log(user)
  const handleChangePermission = () => {
    setAdmin(prevState => !prevState);
  }

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun.current = false;
    }
    updatePermission();
  }, [admin]);

  const updatePermission = async () => {
    const url = `${baseUrl}/api/account`;
    const payload = { _id: user._id, role: admin ? "admin" : "user" };
    await axios.put(url, payload);
  }

  return (
    <Table.Row>
      <Table.Cell collapsing>
        <Checkbox checked={admin} onChange={handleChangePermission} toggle />
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
      <Table.Cell>{formatDate(user.updatedAt)}</Table.Cell>
      <Table.Cell>{admin ? "admin" : "user"}</Table.Cell>
    </Table.Row>
  )
}

export default AccountPermissions;
