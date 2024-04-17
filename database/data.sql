insert into "category" ("name")
values ('READY-TO-WEAR'), ('GIFTS');

insert into "subcategory" ("name", "categoryId")
values('Dresses', 1), ('Shirts and tops', 1), ('Outerwear', 1);

insert into "subcategory" ("name", "categoryId")
values('Accessories', 2), ('Hats', 2);

insert into "product" ("name", "color", "size", "material", "description", "imageUrl", "price", "categoryId", "subcategoryId")
values ('Utility jacket', 'green', '4', 'nylon', 'Durable nylon utility jacket in green with multiple pockets.', '/server/public/images/jacket1.jpg', 1100, 1, 3),
('Organza dress', 'white', '2', 'silk', 'Airy and light long dress in silk georgette and organza.', '/server/public/images/dress1.jpg', 750, 1, 1),
('Bustier top', 'blue', '2', 'silk', 'Bustier top with sculptural organza detail.', '/server/public/images/bustier1.jpg', 500, 1, 2),
('Denim baseball cap', 'blue', '1', 'cotton', 'Denim baseball cap with hand-embroidered floral appliqués.', '/server/public/images/cap1.jpg', 250, 2, 2),
('Glasses cord', 'brown', 'one-size', 'leather', 'Glasses cord made in leather and rope.', '/server/public/images/bustier1.jpg', 150, 2, 1),
('Woven fabric headband', 'natural', 'one-size', 'nylon', 'Headband in a natural, woven fabric design.', '/server/public/images/bustier1.jpg', 125, 2, 1);
