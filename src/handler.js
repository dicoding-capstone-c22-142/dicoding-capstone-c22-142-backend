const { nanoid } = require('nanoid');
const products = require('./products');
const transactions = require('./transactions');
const users = require('./users');

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
    current_length,
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

  const product_id = "CT-P"+nanoid(16)+"PRD";
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
    current_length,
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
            current_length: product.current_length,
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
            current_length: product.current_length,
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
            current_length: product.current_length,
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
          current_length: product.current_length,
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
    current_length,
    visibility,
  } = request.payload;

  if (!product_name) {
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
      current_length,
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
    product_type,
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

  const transaction_id = "CT-T"+nanoid(16)+"TRS";
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
    product_type,
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
            product_type: transaction.product_type,
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
            product_type: transaction.product_type,
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

// Users ---------------------------------------------------------------------------------------------
const addUserHandler = (request, h) => {
  const {
    email,
    password,
    full_name,
    phone_number,
    profile_image,
    role,
    is_logged_in,
  } = request.payload;

  if (!email) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan user. Mohon isi email',
      })
      .code(400);
    return response;
  }

  const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  if (!regularExpression.test(password) || password.length < 8 || password.length > 15) {
    const response = h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan user. Kata sandi harus terdiri dari 8 sampai 16 karakter, mengandung huruf, angka, dan simbol',
      })
      .code(400);
    return response;
  }

  const user_id = "CT-U"+nanoid(16)+"ACN"
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newUser = {
    email,
    password,
    full_name,
    phone_number,
    profile_image,
    role,
    is_logged_in,
    user_id,
    insertedAt,
    updatedAt,
  };

  users.push(newUser);

  const isSuccess = users.filter((note) => note.user_id === user_id).length > 0;

  if (isSuccess) {
    const response = h
      .response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId: user_id,
        },
      })
      .code(201);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'User gagal ditambahkan',
    })
    .code(500);
  return response;
};

const getAllUsersHandler = (request, h) => {
  const { email } = request.query;

  if (!email) {
    const response = h
      .response({
        status: 'success',
        data: {
          users: users.map((user) => ({
            user_id: user.user_id,
            email: user.email,
            full_name: user.full_name,
            phone_number: user.phone_number,
            profile_image: user.profile_image,
            role: user.role,
            is_logged_in: user.is_logged_in,
            insertedAt: user.insertedAt,
            updatedAt: user.updatedAt,
          })),
        },
      })
      .code(200);

    return response;
  }

  if (full_name) {
    const filteredUsersName = users.filter((user) => {
      const full_nameRegex = new RegExp(full_name, 'gi');
      return full_nameRegex.test(user.full_name);
    });

    const response = h
      .response({
        status: 'success',
        data: {
          users: filteredUsersName.map((user) => ({
            user_id: user.user_id,
            email: user.email,
            full_name: user.full_name,
            phone_number: user.phone_number,
            profile_image: user.profile_image,
            role: user.role,
            is_logged_in: user.is_logged_in,
            insertedAt: user.insertedAt,
            updatedAt: user.updatedAt,
          })),
        },
      })
      .code(200);

    return response;
  }
};

const getUserByIdHandler = (request, h) => {
  const { userId } = request.params;

  const user = users.filter((n) => n.user_id === userId)[0];

  if (user) {
    const response = h
      .response({
        status: 'success',
        data: {
          user,
        },
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'User tidak ditemukan',
    })
    .code(404);
  return response;
};

const editUserByIdHandler = (request, h) => {
  const { userId } = request.params;

  const {
    email,
    password,
    full_name,
    phone_number,
    profile_image,
    role,
    is_logged_in,
    user_id,
  } = request.payload;

  if (!email) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui user. Mohon isi email',
      })
      .code(400);
    return response;
  }

  const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  if (!regularExpression.test(password) || password.length < 8 || password.length > 15) {
    const response = h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan user. Kata sandi harus terdiri dari 8 sampai 16 karakter, mengandung huruf, angka, dan simbol',
      })
      .code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();

  const index = users.findIndex((note) => note.user_id === userId);

  if (index !== -1) {
    users[index] = {
      ...users[index],
      email,
      password,
      full_name,
      phone_number,
      profile_image,
      role,
      is_logged_in,
      user_id,
      updatedAt,
    };

    const response = h
      .response({
        status: 'success',
        message: 'User berhasil diperbarui',
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'Gagal memperbarui user. Id tidak ditemukan',
    })
    .code(404);
  return response;
};

const deleteUserByIdHandler = (request, h) => {
  const { userId } = request.params;

  const index = users.findIndex((note) => note.user_id === userId);

  if (index !== -1) {
    users.splice(index, 1);

    const response = h
      .response({
        status: 'success',
        message: 'User berhasil dihapus',
      })
      .code(200);
    return response;
  }

  const response = h
    .response({
      status: 'fail',
      message: 'User gagal dihapus. Id tidak ditemukan',
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

  // User
  addUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  editUserByIdHandler,
  deleteUserByIdHandler,
};
