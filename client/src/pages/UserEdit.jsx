import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Input, Link } from '@nextui-org/react';
import { register } from '../redux/userSlice';
import axios from 'axios';

function UserEdit() {
  const navigate = useNavigate();
  //   const { id: userID } = useParams();
  const userID = '627ff332dbb15173b7c1dde4';
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [userToEdit, setUserToEdit] = useState({});
  const [email, setEmail] = useState(userToEdit ? userToEdit.email : '');
  const [name, setName] = useState(userToEdit ? userToEdit.name : '');
  const [isAdmin, setIsAdmin] = useState(userToEdit ? userToEdit.isAdmin : '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserToEdit = async () => {
      const { data } = await axios.get(`/api/users/${userID}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUserToEdit(data);
      setEmail(data.email);
      setName(data.name);
      setIsAdmin(data.isAdmin);
    };
    if (!user || !user.isAdmin) {
      navigate('/login');
    } else {
      fetchUserToEdit();
    }
  }, [navigate, user]);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onIsAdminChange = (event) => {
    setIsAdmin((previousState) => !previousState);
  };

  const onSubmit = async (event) => {
    console.log('Here is your info:', user);
    console.log(`Bearer ${user.token}`);

    event.preventDefault();
    // TODO: Dispatch a Redux action. For now, change this as local state
    setMessage('Successfully Registered!');

    // TODO: Use Modal instead
    if (window.confirm("Are you sure you want to remove this User? This can't be undone")) {
      const { data } = await axios.put(
        `/api/users/${userID}`,
        { email, name, isAdmin },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // TODO: For now, just assume success above
      setUserToEdit((previousUser) => {
        return { ...previousUser, name, email, isAdmin };
      });
    }
  };

  return (
    <React.Fragment>
      <h1>User Edit</h1>
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
        <Checkbox isSelected={isAdmin} onChange={onIsAdminChange}>
          Is Admin
        </Checkbox>
        <Button type='submit'>Update</Button>
      </form>
    </React.Fragment>
  );
}

export default UserEdit;
