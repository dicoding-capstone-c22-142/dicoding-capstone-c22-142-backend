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

  //user
  addUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  editUserByIdHandler,
  deleteUserByIdHandler,
} = require('./handler');

const api_version = 'v1';
const routes = [
  // Products --------------------------------------------------------------
  {
    method: '*',
    path: '/{any*}',
    handler: () => 'Halaman tidak tersedia | Dicoding Capstone C22-142 - Cashtex API',
  },
  {
    method: 'POST',
    path: '/{api_version}/products',
    handler: addProductHandler,
  },
  {
    method: 'GET',
    path: '/{api_version}/products',
    handler: getAllProductsHandler,
  },
  {
    method: 'GET',
    path: '/{api_version}/products/{productId}',
    handler: getProductByIdHandler,
  },
  {
    method: 'PUT',
    path: '/{api_version}/products/{productId}',
    handler: editProductByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/{api_version}/products/{productId}',
    handler: deleteProductByIdHandler,
  },

  // Transactions --------------------------------------------------------------
  {
    method: 'POST',
    path: '/{api_version}/transactions',
    handler: addTransactionHandler,
  },
  {
    method: 'GET',
    path: '/{api_version}/transactions',
    handler: getAllTransactionsHandler,
  },
  {
    method: 'GET',
    path: '/{api_version}/transactions/{transactionId}',
    handler: getTransactionByIdHandler,
  },
  {
    method: 'PUT',
    path: '/{api_version}/transactions/{transactionId}',
    handler: () => 'Transaksi tidak dapat diubah | Dicoding Capstone C22-142 - Cashtex API Product',
  },
  {
    method: 'DELETE',
    path: '/{api_version}/transactions/{transactionId}',
    handler: () => 'Transaksi tidak dapat dihapus | Dicoding Capstone C22-142 - Cashtex API Product',
  },

  // Users --------------------------------------------------------------
  {
    method: 'POST',
    path: '/{api_version}/users',
    handler: addUserHandler,
  },
  {
    method: 'GET',
    path: '/{api_version}/users',
    handler: getAllUsersHandler,
  },
  {
    method: 'GET',
    path: '/{api_version}/users/{userId}',
    handler: getUserByIdHandler,
  },
  {
    method: 'PUT',
    path: '/{api_version}/users/{userId}',
    handler: editUserByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/{api_version}/users/{userId}',
    handler: deleteUserByIdHandler,
  },
];

module.exports = routes, api_version;
