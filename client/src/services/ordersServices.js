import axios from 'axios';

const ordersURI = '/api/orders';

class OrdersServices {
  async getAllOrders(authToken) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    const { data } = await axios.get(`${ordersURI}`, axiosConfig);

    return data;
  }

  async getOrderByID(authToken, orderID) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${orderID}`, axiosConfig);

    return data;
  }

  async createOrder(authToken, order) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    // TODO: This backend route doesn't exist yet!
    const { data } = await axios.post(`/api/orders`, axiosConfig, order);

    return data;
  }
}

export default new OrdersServices();
