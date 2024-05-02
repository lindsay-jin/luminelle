/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg, { Client } from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
  authMiddleware,
} from './lib/index.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};

type Auth = {
  username: string;
  password: string;
};

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/categories', async (req, res, next) => {
  try {
    const sql = `
      select * from "category"
      order by "categoryId";
    `;
    const result = await db.query(sql);
    const categories = result.rows;
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

app.get('/api/categories/:categoryId/subcategories', async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const sql = `
      select * from "subcategory"
      where "categoryId" = $1
      order by "subcategoryId";
    `;
    const params = [categoryId];
    const result = await db.query(sql, params);
    const subcategories = result.rows;
    res.json(subcategories);
  } catch (err) {
    next(err);
  }
});

app.get(
  '/api/categories/:categoryId/subcategories/:subcategoryId/products',
  async (req, res, next) => {
    try {
      const { categoryId, subcategoryId } = req.params;
      const sql = `
      select * from "product"
      where "categoryId" = $1 and "subcategoryId" = $2
      order by "productId";
    `;
      const params = [categoryId, subcategoryId];
      const result = await db.query(sql, params);
      const products = result.rows.map((product) => ({
        ...product,
        colors: product.colors ? JSON.parse(product.colors) : [],
        sizes: product.sizes ? JSON.parse(product.sizes) : [],
        materials: product.materials ? JSON.parse(product.materials) : [],
        imageUrl: product.imageUrl ? JSON.parse(product.imageUrl) : [],
      }));
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
);

app.get('/api/p/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const sql = `
      select * from "product"
      where "productId" = $1;
    `;
    const params = [productId];
    const result = await db.query(sql, params);
    const [product] = result.rows;
    if (!product) throw new ClientError(404, 'Product not found.');
    product.sizes = JSON.parse(product.sizes);
    product.materials = JSON.parse(product.materials);
    product.colors = JSON.parse(product.colors);
    product.imageUrl = JSON.parse(product.imageUrl);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

app.get('/api/catalog', async (req, res, next) => {
  try {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      return res.json([]);
    }
    const sql = `
      select * from "product"
      where name ilike $1 or description ilike $1
    `;
    const params = [`%${searchQuery}%`];
    const result = await db.query(sql, params);
    const products = result.rows;
    res.json(products);
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new ClientError(400, 'Username and passwords are required fields.');
    const checkUserSql = `
      select "username" from "user"
      where "username" = $1;
    `;
    const checkUserResult = await db.query(checkUserSql, [username]);
    if (checkUserResult.rows.length > 0)
      throw new ClientError(401, 'This username is already taken.');
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "user" ("username", "hashedPassword")
      values ($1, $2)
      returning "userId", "username", "createdAt";
    `;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    const [rows] = result.rows;
    console.log('rows', rows);
    if (!rows) throw new ClientError(404, `Failed to create account.`);
    res.status(201).json(rows);
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) throw new ClientError(401, 'Invalid login.');
    const sql = `
      select "userId", "hashedPassword", "username" from "user"
      where "username" = $1;
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) throw new ClientError(401, 'invalid login');
    const validPassword = await argon2.verify(user.hashedPassword, password);
    if (!validPassword) throw new ClientError(401, 'invalid login');

    const payload = { userId: user.userId, username: user.username };
    const token = jwt.sign(payload, hashKey);
    res.status(200).json({ user: payload, token });
  } catch (error) {
    next(error);
  }
});

app.get('/api/wishlist', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw new ClientError(401, 'User must be logged in to view wishlist.');
    }
    const sql = `
      select * from "wishlist"
      join "product" using ("productId")
      where "userId" = $1;
    `;
    const params = [userId];
    const result = await db.query(sql, params);
    const wishlist = result.rows;
    if (wishlist.length === 0) {
      return res.status(404).json({ message: 'No items in wishlist.' });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    next(error);
  }
});

app.post('/api/wishlist/:productId', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const { productId } = req.params;
    if (!productId) {
      throw new ClientError(400, 'ProductId is required.');
    }
    if (!Number.isInteger(+productId)) {
      throw new ClientError(400, 'Product Id must be an integer.');
    }
    const sql = `
      insert into "wishlist" ("userId", "productId")
      values ($1, $2)
      returning *;
    `;
    const params = [userId, productId];
    const result = await db.query(sql, params);
    const [likedItem] = result.rows;
    res.status(201).json(likedItem);
  } catch (error) {
    next(error);
  }
});

app.delete(
  '/api/wishlist/:productId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.user?.userId;
      const { productId } = req.params;
      if (!Number.isInteger(+productId)) {
        throw new ClientError(400, 'Product Id must be an integer.');
      }
      const sql = `
      delete from "wishlist" where "userId" = $1 and "productId" = $2
      returning *;
    `;
      const params = [userId, productId];
      const result = await db.query(sql, params);
      const [unlikedItem] = result.rows;
      if (!unlikedItem) throw new ClientError(404, 'Product does not exist.');
      res.status(200).json(unlikedItem);
    } catch (error) {
      next(error);
    }
  }
);

app.get('/api/shopping-cart', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw new ClientError(401, 'User needs to login to view shopping cart.');
    }
    const sql = `
      select * from "cart"
      join "product" using ("productId")
      where "userId" = $1;
    `;
    const params = [userId];
    const result = await db.query(sql, params);
    const cart = result.rows;
    if (cart.length === 0) {
      return res.status(404).json([]);
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

app.post('/api/shopping-cart/:productId', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const { productId } = req.params;
    if (!productId) {
      throw new ClientError(400, 'ProductId is required.');
    }
    if (!Number.isInteger(+productId)) {
      throw new ClientError(400, 'Product Id must be an integer.');
    }
    const sql = `
      insert into "cart" ("userId", "productId")
      values ($1, $2)
      returning *;
    `;
    const params = [userId, productId];
    const result = await db.query(sql, params);
    const [cartItem] = result.rows;
    res.status(201).json(cartItem);
  } catch (error) {
    next(error);
  }
});

app.delete(
  '/api/shopping-cart/:productId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const userId = req.user?.userId;
      const { productId } = req.params;
      if (!Number.isInteger(+productId)) {
        throw new ClientError(400, 'Product Id must be an integer.');
      }
      const sql = `
      delete from "cart" where "userId" = $1 and "productId" = $2
      returning *;
    `;
      const params = [userId, productId];
      const result = await db.query(sql, params);
      const [removedItem] = result.rows;
      if (!removedItem) throw new ClientError(404, 'Product does not exist.');
      res.status(200).json(removedItem);
    } catch (error) {
      next(error);
    }
  }
);

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
