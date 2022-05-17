import bcrypt from 'bcrypt';

const users = [
  {
    name: 'Matthew McGrath',
    email: 'user1@gmail.com',
    password: bcrypt.hashSync('userNumberOne', 8),
    isAdmin: true,
  },
  {
    name: 'User 2',
    email: 'user2@gmail.com',
    password: bcrypt.hashSync('userNumberTwo', 8),
  },
  {
    name: 'User 3',
    email: 'user3@gmail.com',
    password: bcrypt.hashSync('userNumberThree', 8),
  },
  {
    name: 'User 4',
    email: 'user4@gmail.com',
    password: bcrypt.hashSync('userNumberFour', 8),
  },
  {
    name: 'User 5',
    email: 'user5@gmail.com',
    password: bcrypt.hashSync('userNumberFive', 8),
  },
];

export default users;
