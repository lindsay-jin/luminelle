/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg, { Client } from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';

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
      const products = result.rows;
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
);

app.get(
  '/api/p/:productId',
  async (req, res, next) => {
    try {
      const {productId } = req.params;
      const sql = `
      select * from "product"
      where "productId" = $1;
    `;
      const params = [productId];
      const result = await db.query(sql, params);
      const [product] = result.rows;
      if (!product) throw new ClientError(404, 'Product not found.');
      res.json(product);
    } catch (err) {
      next(err);
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
