insert into "category" ("name")
values ('READY-TO-WEAR'), ('GIFTS'), ('LUMI CLUB');

insert into "subcategory" ("name", "categoryId")
values('Dresses', 1), ('Shirts and tops', 1), ('Outerwear', 1);

insert into "product" ("name", "color", "size", "material", "description", "imageUrl", "price", "categoryId", "subcategoryId")
values ('Utility jacket', 'green', 4, 'nylon', 'Durable nylon utility jacket in green with multiple pockets.', 'server/public/images/jacket2.jpg', 1100, 1, 3),
('Organza dress', 'white', 2, 'silk', 'Airy and light long dress in silk georgette and organza.', 'server/public/images/dress1.jpg', 750, 1, 1);
