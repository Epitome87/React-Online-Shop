const orders = [
  {
    user: '627ff332dbb15173b7c1dde4',
    items: [
      {
        product: '627ea864f55996a552305fbf',
        name: 'Rubber Batman Ducky',
        quantity: 2,
        image: '/images/products/toy-batduck.jpg',
        price: 12.49,
      },
      {
        product: '627ea864f55996a552305fc2',
        name: 'Bob Ross',
        quantity: 1,
        image: '/images/products/toy-bobross.jpg',
        price: 49.49,
      },
    ],
    shippingAddress: { address: '555 Fake St', city: 'Los Angeles', postal: '92399', country: 'United States' },
    totalPrice: 69.69,
    isPaid: false,
    isShipped: false,
    isDelivered: false,
  },
  {
    user: '62812ecad73d4d317ed934d1',
    items: [
      {
        product: '627ea864f55996a552305fc5',
        name: 'Mario',
        quantity: 3,
        image: '/images/products/toy-mario.jpg',
        price: 32.69,
      },
      {
        product: '627ea864f55996a552305fc2',
        name: 'Bob Ross',
        quantity: 2,
        image: '/images/products/toy-bobross.jpg',
        price: 49.49,
      },
    ],
    shippingAddress: { address: '555 Fake St', city: 'Los Angeles', postal: '92399', country: 'United States' },
    totalPrice: 69.69,
    isPaid: false,
    isShipped: false,
    isDelivered: false,
  },
];

export default orders;
