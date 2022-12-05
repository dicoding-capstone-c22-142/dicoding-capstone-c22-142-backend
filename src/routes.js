const {
  //product
  addProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  editProductByIdHandler,
  deleteProductByIdHandler,

  //transaction
  addTransactionHandler,
  getAllTransactionsHandler,
  getTransactionByIdHandler,
  editTransactionByIdHandler,
  deleteTransactionByIdHandler,

  // //user
  // addUserHandler,
  // getAllUsersHandler,
  // getUserByIdHandler,
  // editUserByIdHandler,
  // deleteUserByIdHandler,
} = require('./handler');

const routes = [
  // Products --------------------------------------------------------------
  {
    method: '*',
    path: '/{any*}',
    handler: () => 'Halaman tidak tersedia | Dicoding Capstone C22-142 - Cashtex API Product',
  },
  {
    method: 'POST',
    path: '/products',
    handler: addProductHandler,
  },
  {
    method: 'GET',
    path: '/products',
    handler: getAllProductsHandler,
  },
  {
    method: 'GET',
    path: '/products/{productId}',
    handler: getProductByIdHandler,
  },
  {
    method: 'PUT',
    path: '/products/{productId}',
    handler: editProductByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/products/{productId}',
    handler: deleteProductByIdHandler,
  },

  // Transactions --------------------------------------------------------------
  {
    method: 'POST',
    path: '/transactions',
    handler: addTransactionHandler,
  },
  {
    method: 'GET',
    path: '/transactions',
    handler: getAllTransactionsHandler,
  },
  {
    method: 'GET',
    path: '/transactions/{transactionId}',
    handler: getTransactionByIdHandler,
  },
  {
    method: 'PUT',
    path: '/transactions/{transactionId}',
    handler: () => 'Transaksi tidak dapat diubah | Dicoding Capstone C22-142 - Cashtex API Product',
  },
  {
    method: 'DELETE',
    path: '/transactions/{transactionId}',
    handler: () => 'Transaksi tidak dapat dihapus | Dicoding Capstone C22-142 - Cashtex API Product',
  },

  // // users
  // {
  //   method: 'POST',
  //   path: '/users',
  //   handler: addUserHandler,
  // },
  // {
  //   method: 'GET',
  //   path: '/users',
  //   handler: getAllUsersHandler,
  // },
  // {
  //   method: 'GET',
  //   path: '/users/{userId}',
  //   handler: getUserByIdHandler,
  // },
  // {
  //   method: 'PUT',
  //   path: '/users/{userId}',
  //   handler: editUserByIdHandler,
  // },
  // {
  //   method: 'DELETE',
  //   path: '/users/{userId}',
  //   handler: deleteUserByIdHandler,
  // },
];

module.exports = routes;
