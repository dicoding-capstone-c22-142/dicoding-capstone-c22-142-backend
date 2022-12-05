const {
  addProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  editProductByIdHandler,
  deleteProductByIdHandler,
} = require('./handler');

const routes = [
  {
    method: '*',
    path: '/{any*}',
    handler: () => 'Halaman tidak tersedia | Dicoding Capstone C22-142 - Cashtex API',
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
];

module.exports = routes;
