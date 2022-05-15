import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Link } from '@nextui-org/react';
import { login } from '../redux/userSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/alreadyloggedin');
    }
  }, [navigate, user]);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <React.Fragment>
      <h1>Sign In</h1>
      {error && <p>{error}</p>}
      {status === 'loading' && <p>Loading...</p>}
      <form onSubmit={onSubmit}>
        <Input
          onChange={onEmailChange}
          type='email'
          bordered
          animated={true}
          labelPlaceholder='Email'
          color='secondary'
          value={email}
        />
        <Input
          onChange={onPasswordChange}
          type='password'
          bordered
          animated={true}
          labelPlaceholder='Password'
          color='secondary'
          value={password}
        />
        <Button type='submit'>Sign In</Button>
      </form>
      <div>
        New User? <Link href={`/registration`}>Register</Link>
      </div>
    </React.Fragment>
  );
}

export default Login;
