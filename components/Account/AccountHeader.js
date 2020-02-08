import { Segment, Header, Label, Icon } from 'semantic-ui-react'
import formatDate from '../../utils/formatDate'

function AccountHeader({ role, email, createdAt, name }) {
  return (
    <Segment inverted color="green" secondary>
      <Label
        size="large"
        ribbon
        color="blue"
        content={role}
        icon="privacy"
        style={{ textTransform: "capitalize" }}
      />
      <Header inverted textAlign="center" as="h1" icon>
        <Icon name="user" circular />
        {name}
        <Header.Subheader>{email}</Header.Subheader>
        <Header.Subheader>Joined On {formatDate(createdAt)}</Header.Subheader>
      </Header>
    </Segment>
  );
}

export default AccountHeader;
