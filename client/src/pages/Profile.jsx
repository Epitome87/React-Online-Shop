import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Link } from '@nextui-org/react';
import { getProfile, updateUser } from '../redux/userSlice';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  // Pre-fill form values with those of the User, if they exist
  const [email, setEmail] = useState(user ? user.email : '');
  const [name, setName] = useState(user ? user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Re-direct to Login page if no User exists
    if (!user) {
      return navigate('/login');
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
      setMessage('Passwords do not matach');
    } else {
      setMessage('Updating User');
      dispatch(updateUser({ email, name, password, token: user.token }));
    }
  };

  return (
    <React.Fragment>
      <h1>Profile</h1>
      {error && <p>{error}</p>}
      {status === 'loading' && <p>Loading...</p>}
      {message && <p>{message}</p>}
      {status === 'success' && <p>Successfully updated profile</p>}
      {user && (
        <p>
          {user._id} - {user.name} - {user.email}
        </p>
      )}
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
        <Button type='submit'>Update</Button>
      </form>
    </React.Fragment>
  );
}

export default Profile;
