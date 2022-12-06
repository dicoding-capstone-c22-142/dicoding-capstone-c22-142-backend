const { nanoid } = require('nanoid');
const products = require('./products');
const transactions = require('./transactions');

// Products ---------------------------------------------------------------------------------------------
const addProductHandler = (request, h) => {
  const {
    product_name,
    product_price,
    author,
    product_image,
    product_type,
    product_length,
    capital,
    initial_stock,
    current_stock,
    visibility,
  } = request.payload;

  if (!product_name) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan produk. Mohon isi nama produk',
      })
      .code(400);
    return response;
  }

  if (current_stock > initial_stock) {
    const response = h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan produk. current_stock tidak boleh lebih besar dari initial_stock',
      })
      .code(400);
    return response;
  }

  const product_id = nanoid(16);
  const outstock = current_stock === 0;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newProduct = {
    product_name,
    product_price,
    author,
    product_image,
    product_type,
    product_length,
    capital,
    initial_stock,
    current_stock,
    visibility,
    product_id,
    outstock,
    insertedAt,
    updatedAt,
  };

  products.push(newProduct);

  const isSuccess = products.filter((note) => note.product_id === product_id).length > 0;

  if (isSuccess) {
    const response = h
      .response({
        status: 'success',
        message: 'Produk berhasil ditambahkan',
        data: {
          productId: product_id,
        },
      })
      .code(201);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Produk gagal ditambahkan',
    })
    .code(500);
  return response;
};

const getAllProductsHandler = (request, h) => {
  const { product_name, visibility, outstock } = request.query;

  if (!product_name && !visibility && !outstock) {
    const response = h
      .response({
        status: 'success',
        data: {
          products: products.map((product) => ({
            product_id: product.product_id,
            product_name: product.product_name,
            product_price: product.product_price,
            product_type: product.product_type,
            product_image: product.product_image,
            product_length: product.product_length,
            capital: product.capital,
            initial_stock: product.initial_stock,
            current_stock: product.current_stock,
            visibility: product.visibility,
            outstock: product.outstock,
            insertedAt: product.insertedAt,
            updatedAt: product.updatedAt,
          })),
        },
      })
      .code(200);

    return response;
  }

  if (product_name) {
    const filteredProductsName = products.filter((product) => {
      const product_nameRegex = new RegExp(product_name, 'gi');
      return product_nameRegex.test(product.product_name);
    });

    const response = h
      .response({
        status: 'success',
        data: {
          products: filteredProductsName.map((product) => ({
            product_id: product.product_id,
            product_name: product.product_name,
            product_price: product.product_price,
            product_type: product.product_type,
            product_image: product.product_image,
            product_length: product.product_length,
            capital: product.capital,
            initial_stock: product.initial_stock,
            current_stock: product.current_stock,
            visibility: product.visibility,
            outstock: product.outstock,
            insertedAt: product.insertedAt,
            updatedAt: product.updatedAt,
          })),
        },
      })
      .code(200);

    return response;
  }

  if (visibility) {
    const filteredProductsReading = products.filter(
      (product) => Number(product.visibility) === Number(visibility),
    );

    const response = h
      .response({
        status: 'success',
        data: {
          products: filteredProductsReading.map((product) => ({
            product_id: product.product_id,
            product_name: product.product_name,
            product_price: product.product_price,
            product_type: product.product_type,
            product_image: product.product_image,
            product_length: product.product_length,
            capital: product.capital,
            initial_stock: product.initial_stock,
            current_stock: product.current_stock,
            visibility: product.visibility,
            outstock: product.outstock,
            insertedAt: product.insertedAt,
            updatedAt: product.updatedAt,
          })),
        },
      })
      .code(200);

    return response;
  }

  const filteredProductsFinished = products.filter(
    (product) => Number(product.outstock) === Number(outstock),
  );

  const response = h
    .response({
      status: 'success',
      data: {
        products: filteredProductsFinished.map((product) => ({
          product_id: product.product_id,
          product_name: product.product_name,
          product_price: product.product_price,
          product_type: product.product_type,
          product_image: product.product_image,
          product_length: product.product_length,
          capital: product.capital,
          initial_stock: product.initial_stock,
          current_stock: product.current_stock,
          visibility: product.visibility,
          outstock: product.outstock,
          insertedAt: product.insertedAt,
          updatedAt: product.updatedAt,
        })),
      },
    })
    .code(200);

  return response;
};

const getProductByIdHandler = (request, h) => {
  const { productId } = request.params;

  const product = products.filter((n) => n.product_id === productId)[0];

  if (product) {
    const response = h
      .response({
        status: 'success',
        data: {
          product,
        },
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Produk tidak ditemukan',
    })
    .code(404);
  return response;
};

const editProductByIdHandler = (request, h) => {
  const { productId } = request.params;

  const {
    product_name,
    product_price,
    author,
    product_image,
    product_type,
    product_length,
    capital,
    initial_stock,
    current_stock,
    visibility,
  } = request.payload;

  if (!product_name) {
    // Client tidak melampirkan properti product_name pada request body
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui produk. Mohon isi nama produk',
      })
      .code(400);
    return response;
  }

  if (current_stock > initial_stock) {
    const response = h
      .response({
        status: 'fail',
        message:
          'Gagal memperbarui produk. current_stock tidak boleh lebih besar dari initial_stock',
      })
      .code(400);
    return response;
  }

  const outstock = initial_stock === 0;
  const updatedAt = new Date().toISOString();

  const index = products.findIndex((note) => note.product_id === productId);

  if (index !== -1) {
    products[index] = {
      ...products[index],
      product_name,
      product_price,
      author,
      product_image,
      product_type,
      product_length,
      capital,
      initial_stock,
      current_stock,
      visibility,
      outstock,
      updatedAt,
    };

    const response = h
      .response({
        status: 'success',
        message: 'Produk berhasil diperbarui',
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Gagal memperbarui produk. Id tidak ditemukan',
    })
    .code(404);
  return response;
};

const deleteProductByIdHandler = (request, h) => {
  const { productId } = request.params;

  const index = products.findIndex((note) => note.product_id === productId);

  if (index !== -1) {
    products.splice(index, 1);

    const response = h
      .response({
        status: 'success',
        message: 'Produk berhasil dihapus',
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Produk gagal dihapus. Id tidak ditemukan',
    })
    .code(404);
  return response;
};

// Transactions ---------------------------------------------------------------------------------------------
const addTransactionHandler = (request, h) => {
  const {
    payment_method,
    total_bill,
    author,
    received,
    change,
    amount,
    product_name,
    product_price,
  } = request.payload;

  if (!payment_method) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan transaksi. Mohon isi metode pembayaran transaksi',
      })
      .code(400);
    return response;
  }

  if (change > received) {
    const response = h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan transaksi. Jumlah kembalian tidak boleh lebih besar dari jumlah diterima',
      })
      .code(400);
    return response;
  }

  const transaction_id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newTransaction = {
    payment_method,
    total_bill,
    author,
    received,
    change,
    amount,
    product_name,
    product_price,
    transaction_id,
    insertedAt,
    updatedAt,
  };

  transactions.push(newTransaction);

  const isSuccess = transactions.filter((note) => note.transaction_id === transaction_id).length > 0;

  if (isSuccess) {
    const response = h
      .response({
        status: 'success',
        message: 'Transaksi berhasil ditambahkan',
        data: {
          transactionId: transaction_id,
        },
      })
      .code(201);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Transaksi gagal ditambahkan',
    })
    .code(500);
  return response;
};

const getAllTransactionsHandler = (request, h) => {
  const { payment_method } = request.query;

  if (!payment_method) {
    const response = h
      .response({
        status: 'success',
        data: {
          transactions: transactions.map((transaction) => ({
            transaction_id: transaction.transaction_id,
            payment_method: transaction.payment_method,
            total_bill: transaction.total_bill,
            author: transaction.author,
            received: transaction.received,
            change: transaction.change,
            amount: transaction.amount,
            product_name: transaction.product_name,
            product_price: transaction.product_price,
            insertedAt: transaction.insertedAt,
            updatedAt: transaction.updatedAt,
          })),
        },
      })
      .code(200);

    return response;
  }

  if (payment_method) {
    const filteredTransactionsName = transactions.filter((transaction) => {
      const payment_methodRegex = new RegExp(payment_method, 'gi');
      return payment_methodRegex.test(transaction.payment_method);
    });

    const response = h
      .response({
        status: 'success',
        data: {
          transactions: filteredTransactionsName.map((transaction) => ({
            transaction_id: transaction.transaction_id,
            payment_method: transaction.payment_method,
            total_bill: transaction.total_bill,
            author: transaction.author,
            received: transaction.received,
            change: transaction.change,
            amount: transaction.amount,
            product_name: transaction.product_name,
            product_price: transaction.product_price,
            insertedAt: transaction.insertedAt,
            updatedAt: transaction.updatedAt,
          })),
        },
      })
      .code(200);

    return response;
  }
};

const getTransactionByIdHandler = (request, h) => {
  const { transactionId } = request.params;

  const transaction = transactions.filter((n) => n.transaction_id === transactionId)[0];

  if (transaction) {
    const response = h
      .response({
        status: 'success',
        data: {
          transaction,
        },
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Transaksi tidak ditemukan',
    })
    .code(404);
  return response;
};


module.exports = {
  // Products
  addProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  editProductByIdHandler,
  deleteProductByIdHandler,

  // Transactions
  addTransactionHandler,
  getAllTransactionsHandler,
  getTransactionByIdHandler,
};
