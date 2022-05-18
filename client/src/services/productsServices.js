import axios from 'axios';

const productsURI = '/api/products';

class ProductsServices {
  async getAllProducts() {
    const { data } = await axios.get(productsURI);

    return data;
  }

  async createProduct(authToken, { ...product }) {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    };

    const { data } = await axios.post(`${productsURI}`, product, axiosConfig);

    return data;
  }

  async updateProductByID(initialProduct) {
    const { _id } = initialProduct;

    // TODO: Do we want to allow editing of _id? Probably not? So let's remove it for now
    delete initialProduct._id;
    const { data } = await axios.put(`${productsURI}/${_id}`, initialProduct);

    return data;
  }

  async deleteProduct(authToken, product) {
    const { _id: id } = product;

    // TODO: Where do I retrieve this from -- can it be done inside this slice without passing it as argument?
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    };

    console.log('Attempting to delete product with ID, with Auth, with Product', id, authToken, product);

    const response = await axios.delete(`${productsURI}/${id}`, axiosConfig);

    console.log('DELETE PRODUCT RESPONSE', response);

    if (response && response.status === 200) return product;

    return `${response.status}: ${response.statusText}`;
  }
}

export default new ProductsServices();
