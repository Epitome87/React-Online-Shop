import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // TODO: Make this Redux state
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`/api/users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      setUsers(data);
    };

    if (user && user.isAdmin) {
      fetchUsers();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const onUserDelete = async (userID, event) => {
    // TODO: Use Modal instead
    if (window.confirm("Are you sure you want to remove this User? This can't be undone")) {
      const { data } = await axios.delete(`/api/users/${userID}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      // TODO: For now, just assume success above
      setUsers((previousUsers) => previousUsers.filter((user) => user._id !== userID));
    }
  };

  const renderedUsers = users.map((user) => {
    return (
      <li key={user._id}>
        <p>ID: {user._id}</p>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Is Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
        <Link to={`/users/${user._id}`}>Edit</Link>
        <button type='button' onClick={() => onUserDelete(user._id)}>
          Delete
        </button>
      </li>
    );
  });

  if (!users) return <p>Fetching Users...</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>{renderedUsers}</ul>
    </div>
  );
}

export default Users;
