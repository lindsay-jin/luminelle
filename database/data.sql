insert into "category" ("name")
values ('READY-TO-WEAR'), ('GIFTS');

insert into "subcategory" ("name", "categoryId")
values('Dresses', 1), ('Shirts and tops', 1), ('Outerwear', 1);

insert into "subcategory" ("name", "categoryId")
values('Accessories', 2), ('Hats', 2);

insert into "product" ("name", "color", "size", "material", "description", "imageUrl", "price", "categoryId", "subcategoryId")
values ('Pleated stripe dress', 'blue', '4', 'cotton', 'Sleeveless, high-collar dress with pleated skirt detail in blue stripe.', '/images/blue-stripe-dress1.png', 1100, 1, 1),
('Sailor collar midi dress', 'green', '2', 'silk', 'Sleeveless midi dress with sailor collar and belted waist.', '/images/green-dress1.png', 900, 1, 1),
('Plaid mini dress', 'grey', '6', 'wool', 'Sleeveless mini dress with pleated skirt.', '/images/grey-dress1.png', 650, 1, 1),
('Black oversized collar dress', 'black', '8', 'wool', 'Black wool dress with oversized collar and buttoned front detail.', '/images/black-dress1.png', 850, 1, 1),
('Poplin shirt dress', 'white', '2', 'cotton', 'White, floor-length dress with shirt collar.', '/images/white-dress1.png', 1500, 1, 1),
('Summer picnic dress', 'red', '4', 'linen', 'Red, short-sleeve dress in a floral print with zip-front.', '/images/red-dress1.png', 470, 1, 1),
('Striped cotton shirt', 'blue', '10', 'cotton', 'Striped cotton shirt with raw hem.', '/images/blue-shirt1.png', 250, 1, 2),
('Cashmere knit cardigan', 'red', '6', 'cashmere', 'Premium cashmere cardigan in cherry red.', '/images/red-top1.png', 650, 1, 2),
('Cashmere striped cardigan', 'red', '4', 'cashmere', 'Red and white striped cashmere cardigan with sailor collar.', '/images/red-stripe-top1.png', 550, 1, 2),
('Oversized collar shirt', 'white', '8', 'cotton', 'White, button-up, cropped shirt with oversized collar.', '/images/white-top1.png', 350, 1, 2),
('Napa leather coat', 'yellow', '4', 'leather', 'Durable and soft leather coat with belted waist.', '/images/yellow-coat1.png', 3500, 1, 3),
('Doubled-breasted leather coat', 'brown', '6', 'leather', 'Double-breasted leather coat with oversized collar and belted waist.', '/images/brown-coat1.png', 2700, 1, 3),
('Single-breasted wool jacket', 'blue', '2', 'wool', 'Single-breasted, handmade wool jacket.', '/images/blue-jacket1.png', 700, 1, 3),
('Woven fabric belt', 'natural', 'one-size', 'cotton', 'Woven fabric belt.', '/images/belt1.png', 200, 2, 4),
('Cashmere socks', 'pink', 'one-size', 'cashmere', 'Soft cashmere hand-knit socks.', '/images/pink-socks1.png', 320, 2, 4),
('Printed polka-dot scarf', 'red', 'one-size', 'silk', 'Polka-dot printed silk twill scarf.', '/images/red-scarf1.png', 400, 2, 4),
('Printed poplin scarf', 'blue', 'one-size', 'cotton', 'Geometric pattern poplin scarf.', '/images/blue-scarf1.png', 300, 2, 4),
('Green-tinted sunglasses', 'green', 'one-size', 'metal', 'Iconic square sunglasses in metal frame.', '/images/green-glasses1.png', 350, 2, 4),
('Denim embroidered cap', 'blue', 'one-size', 'cotton', 'Denim baseball cap with embroidery', '/images/denim-cap1.png', 200, 2, 5)
