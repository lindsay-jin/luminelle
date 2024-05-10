set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "user" (
  "userId" serial PRIMARY KEY,
  "username" text,
  "hashedPassword" text,
  "createdAt" timestamptz DEFAULT 'now()'
);

CREATE TABLE "category" (
  "categoryId" serial PRIMARY KEY,
  "name" text
);

CREATE TABLE "subcategory" (
  "subcategoryId" serial PRIMARY KEY,
  "name" text,
  "categoryId" int
);

CREATE TABLE "product" (
  "productId" serial PRIMARY KEY,
  "name" text,
  "description" text,
  "colors" text,
  "sizes" text,
  "materials" text,
  "imageUrl" text,
  "price" int,
  "categoryId" int,
  "subcategoryId" int
);

CREATE TABLE "wishlist" (
  "wishlistId" serial PRIMARY KEY,
  "userId" int,
  "productId" int,
  "createdAt" timestamptz DEFAULT 'now()'
);

CREATE TABLE "cartItem" (
  "cartItemId" serial PRIMARY KEY,
  "userId" int,
  "productId" int,
  "quantity" int,
  "size" text,
  "createdAt" timestamptz DEFAULT 'now()',
  UNIQUE ("userId", "productId", "size")
);

ALTER TABLE "subcategory" ADD FOREIGN KEY ("categoryId") REFERENCES "category" ("categoryId");

ALTER TABLE "product" ADD FOREIGN KEY ("categoryId") REFERENCES "category" ("categoryId");

ALTER TABLE "product" ADD FOREIGN KEY ("subcategoryId") REFERENCES "subcategory" ("subcategoryId");

ALTER TABLE "wishlist" ADD FOREIGN KEY ("userId") REFERENCES "user" ("userId");

ALTER TABLE "wishlist" ADD FOREIGN KEY ("productId") REFERENCES "product" ("productId");

ALTER TABLE "cartItem" ADD FOREIGN KEY ("userId") REFERENCES "user" ("userId");

ALTER TABLE "cartItem" ADD FOREIGN KEY ("productId") REFERENCES "product" ("productId");
