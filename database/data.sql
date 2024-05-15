insert into "category" ("name")
values ('READY-TO-WEAR'), ('GIFTS');

insert into "subcategory" ("name", "categoryId")
values('Dresses', 1), ('Shirts and tops', 1), ('Outerwear', 1);

insert into "subcategory" ("name", "categoryId")
values('Accessories', 2), ('Hats', 2);

insert into "product" ("name", "colors", "sizes", "materials", "description", "imageUrl", "price", "categoryId", "subcategoryId")
values ('Pleated stripe dress', '["blue"]', '["8", "10", "12", "14"]', '["cotton"]', 'Sleeveless, high-collar dress with pleated skirt detail in blue stripe.', '["/images/blue-stripe-dress1.png", "/images/blue-stripe-dress2.png", "/images/blue-stripe-dress3.png", "/images/blue-stripe-dress4.png", "/images/blue-stripe-dress5.png"]', 1100, 1, 1),
('Sailor collar midi dress', '["green"]', '["0", "2", "4", "6"]', '["silk"]', 'Sleeveless midi dress with sailor collar and belted waist.', '["/images/green-dress1.png", "/images/green-dress2.png", "/images/green-dress3.png", "/images/green-dress4.png", "/images/green-dress5.png"]', 900, 1, 1),
('Plaid mini dress', '["grey"]', '["0", "2", "4", "10", "12", "14"]', '["wool"]', 'Sleeveless mini dress with pleated skirt.', '["/images/grey-dress1.png", "/images/grey-dress2.png", "/images/grey-dress3.png", "/images/grey-dress4.png"]', 650, 1, 1),
('Black oversized collar dress', '["black"]', '["0", "2", "4", "6", "8", "10", "12", "14"]', '["wool", "silk"]', 'Black wool dress with oversized collar and buttoned front detail.', '["/images/black-dress1.png", "/images/black-dress2.png", "/images/black-dress3.png", "/images/black-dress4.png" ]', 850, 1, 1),
('Poplin shirt dress', '["white"]', '["0", "2", "10", "12", "14"]', '["cotton", "silk"]', 'White, floor-length dress with shirt collar.', '["/images/white-dress1.png", "/images/white-dress2.png", "/images/white-dress3.png", "/images/white-dress4.png"]', 1500, 1, 1),
('Summer picnic dress', '["red"]', '["0", "2", "4", "6", "8", "10"]', '["linen"]', 'Red, short-sleeve dress in a floral print with zip-front.', '["/images/red-dress1.png", "/images/red-dress2.png", "/images/red-dress3.png", "/images/red-dress4.png"]', 470, 1, 1),
('Striped cotton shirt', '["blue"]', '["0", "2", "4", "6", "8"]', '["cotton"]', 'Striped cotton shirt with raw hem.', '["/images/blue-shirt1.png", "/images/blue-shirt2.png", "/images/blue-shirt3.png", "/images/blue-shirt4.png"]', 250, 1, 2),
('Cashmere knit cardigan', '["red"]', '["0", "2", "4", "6", "8"]', '["cashmere"]', 'Premium cashmere cardigan in cherry red.', '["/images/red-top1.png", "/images/red-top2.png", "/images/red-top3.png", "/images/red-top4.png"]', 650, 1, 2),
('Cashmere striped cardigan', '["red", "white"]', '["0", "2", "4", "6", "8", "10", "12", "14"]', '["cashmere"]', 'Red and white striped cashmere cardigan with sailor collar.', '["/images/red-stripe-top1.png", "/images/red-stripe-top2.png", "/images/red-stripe-top3.png", "/images/red-stripe-top4.png"]', 550, 1, 2),
('Oversized collar shirt', '["white"]', '["10", "12", "14"]', '["cotton"]', 'White, button-up, cropped shirt with oversized collar.', '["/images/white-top1.png", "/images/white-top2.png", "/images/white-top3.png", "/images/white-top4.png"]', 350, 1, 2),
('Napa leather coat', '["yellow"]', '["0", "2", "4", "6", "8", "10", "12", "14"]', '["leather"]', 'Durable and soft leather coat with belted waist.', '["/images/yellow-coat1.png", "/images/yellow-coat2.png", "/images/yellow-coat3.png", "/images/yellow-coat4.png"]', 3500, 1, 3),
('Doubled-breasted leather coat', '["brown"]', '["0", "2", "4", "6", "8", "10", "12", "14"]', '["suede"]', 'Double-breasted leather coat with oversized collar and belted waist.', '["/images/brown-coat1.png","/images/brown-coat2.png", "/images/brown-coat3.png", "/images/brown-coat4.png"]', 2700, 1, 3),
('Single-breasted wool jacket', '["blue"]', '["0", "2", "10", "12", "14"]', '["wool"]', 'Single-breasted, handmade wool jacket.', '["/images/blue-jacket1.png", "/images/blue-jacket2.png", "/images/blue-jacket3.png"]', 700, 1, 3),
('Woven fabric belt', '["natural"]', '["one-size"]', '["cotton"]', 'Woven fabric belt.', '["/images/belt1.png", "/images/belt2.png"]', 200, 2, 4),
('Cashmere socks', '["pink"]', '["one-size"]', '["cashmere"]', 'Soft cashmere hand-knit socks.', '["/images/pink-socks1.png", "/images/pink-socks2.png", "/images/pink-socks3.png"]', 320, 2, 4),
('Printed polka-dot scarf', '["red", "blue"]', '["one-size"]', '["silk"]', 'Polka-dot printed silk twill scarf.', '["/images/red-scarf1.png", "/images/red-scarf2.png", "/images/red-scarf3.png"]', 400, 2, 4),
('Printed poplin scarf', '["blue"]', '["one-size"]', '["cotton"]', 'Geometric pattern poplin scarf.', '["/images/blue-scarf1.png", "/images/blue-scarf2.png", "/images/blue-scarf3.png"]', 300, 2, 4),
('Green-tinted sunglasses', '["green"]', '["one-size"]', '["metal"]', 'Iconic square sunglasses in metal frame.', '["/images/green-glasses1.png", "/images/green-glasses2.png", "/images/green-glasses3.png", "/images/green-glasses4.png"]', 350, 2, 4),
('Denim embroidered cap', '["blue"]', '["one-size"]', '["cotton"]', 'Denim baseball cap with embroidery', '["/images/denim-cap1.png", "/images/denim-cap2.png"]', 200, 2, 5),
('Cloud bucket hat', '["blue"]', '["one-size"]', '["cotton"]', 'Cotton bucket hat', '["/images/denim-cap1.png", "/images/denim-cap2.png"]', 200, 2, 5)
