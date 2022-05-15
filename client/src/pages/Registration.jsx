import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Link } from '@nextui-org/react';
import { register } from '../redux/userSlice';

function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/alreadyloggedin');
    }
  }, [navigate, user]);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register({ email, name, password }));
      setMessage('Successfully Registered!');
    }
  };

  return (
    <React.Fragment>
      <h1>Sign In</h1>
      {error && <p>{error}</p>}
      {status === 'loading' && <p>Loading...</p>}
      {message && <p>{message}</p>}
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
          onChange={onNameChange}
          type='text'
          bordered
          animated={true}
          labelPlaceholder='Name'
          color='secondary'
          value={name}
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
        <Input
          onChange={onConfirmPasswordChange}
          type='password'
          bordered
          animated={true}
          labelPlaceholder='Confirm Password'
          color='secondary'
          value={confirmPassword}
        />
        <Button type='submit'>Register</Button>
      </form>
      <div>
        Already registered? <Link href={`/login`}>Login</Link>
      </div>
    </React.Fragment>
  );
}

export default Registration;
