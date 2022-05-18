import axios from 'axios';

const usersURI = '/api/users';

class UsersServices {
  async login(email, password) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${usersURI}/login`, { email, password }, axiosConfig);

    // TODO: Do we need to payload all of User's properties?!
    //   At the moment our data is: { user: { etc}, token: ""}
    return { ...data.user };
  }

  async register(email, name, password) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${usersURI}`, { email, name, password }, axiosConfig);

    // Data holds User information like email, name, password, ._id, and their Auth Token
    return { ...data };
  }

  async getProfile(authToken, userID) {
    const userToken = '';
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };

    // Id could be a User._id or 'profile' (self)
    const { data } = await axios.get(`${usersURI}/${userID}`, axiosConfig);

    // Data holds User information like email, name, password, ._id, and their Auth Token
    return { ...data };
  }

  async updateUser({ authToken, email, name, password }) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    };

    const { data } = await axios.put(`${usersURI}/profile`, { email, name, password }, axiosConfig);

    // Data holds User information like email, name, password, ._id, and their Auth Token
    return { ...data };
  }

  async getAllUsers(authToken) {
    const { data } = await axios.get(usersURI, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    return data;
  }

  async getUserByID(authToken, userID) {
    const { data } = await axios.get(`${usersURI}/${userID}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    return data;
  }

  async deleteUserByID(authToken, userID) {
    const { data } = await axios.delete(`${usersURI}/${userID}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    return data;
  }

  async updateUserByID(authToken, userID, { email, name, isAdmin }) {
    const { data } = await axios.put(
      `${usersURI}/${userID}`,
      { email, name, isAdmin },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return data;
  }
}

export default new UsersServices();
