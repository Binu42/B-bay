import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Message, Icon, Form, Segment, Button } from 'semantic-ui-react'
import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import { handleLogin } from '../utils/auth'

const INTIAL_STATE = {
  email: "",
  password: ""
}

function Signup() {
  const [user, setUser] = useState(INTIAL_STATE);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleChange = () => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      setError('');
      const url = `${baseUrl}/api/login`
      const payload = { ...user }
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <Message attached
      icon="privacy"
      header="Welcome Back"
      content="Login With Email and Password"
      color="teal"
    />
    Login
    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
      <Message
        error
        header="Oops!!"
        content={error}
      />
      <Segment>
        <Form.Input
          icon='envelope'
          fluid
          type="email"
          iconPosition="left"
          name="email"
          label="Email"
          placeholder="Enter Your Email"
          onChange={handleChange}
        />
        <Form.Input
          icon='lock'
          fluid
          type="password"
          iconPosition="left"
          name="password"
          label="password"
          placeholder="Enter Your password"
          onChange={handleChange}
        />
        <Button
          icon="sign in"
          disabled={disabled || loading}
          type="submit"
          color="green"
          content="signup"
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help" />
      New User ?{" "}
      <Link href='/signup'>
        <a>signup Here</a>
      </Link>{" "}instead
    </Message>
  </>;
}

export default Signup;
