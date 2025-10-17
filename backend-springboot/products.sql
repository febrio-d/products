DROP TABLE IF EXISTS products;

CREATE TABLE products (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          title VARCHAR(255) NOT NULL,
                          handle VARCHAR(255),
                          vendor VARCHAR(255),
                          price DECIMAL(10, 2),
                          image_src VARCHAR(2048)
);

-- --------------------------------------------------
-- INSERT STATEMENTS for sample products
-- --------------------------------------------------

INSERT INTO products (id, title, handle, vendor, price, image_src) VALUES
                                                                       (9618447860060, 'Relaxed Mesh T-Shirt', 'relaxed-mesh-t-shirt', 'FAMME', 199.00, 'https://picsum.photos/200/300?random=1'),
                                                                       (9262846116188, 'Vortex Tights 2', 'vortex-tights-2', 'FAMME', 249.00, 'https://picsum.photos/200/300?random=2'),
                                                                       (9262804238684, 'Gym Sports Bra', 'gym-sports-bra-black', 'FAMME', 199.00, 'https://picsum.photos/200/300?random=3'),
                                                                       (9262744830300, 'Power Seamless Tights', 'power-seamless-tights', 'FAMME', 249.00, 'https://picsum.photos/200/300?random=4'),
                                                                       (9262700396892, 'Essential Hoodie', 'essential-hoodie', 'FAMME', 399.00, 'https://picsum.photos/200/300?random=5'),
                                                                       (9262768521564, 'Pace Seamless Long Sleeve', 'pace-seamless-long-sleeve', 'FAMME', 299.00, 'https://picsum.photos/200/300?random=6'),
                                                                       (9262689026396, 'Essential Sweatpants', 'essential-sweatpants', 'FAMME', 349.00, 'https://picsum.photos/200/300?random=7'),
                                                                       (9262840512860, 'Elevate Vortex Leggings 2', 'elevate-vortex-leggings-2', 'FAMME', 499.00, 'https://picsum.photos/200/300?random=8'),
                                                                       (9262821212508, 'Core Seamless Long Sleeve', 'core-seamless-long-sleeve', 'FAMME', 299.00, 'https://picsum.photos/200/300?random=9'),
                                                                       (9262711013724, 'Gym T-shirt', 'gym-t-shirt', 'FAMME', 199.00, 'https://picsum.photos/200/300?random=10'),
                                                                       (9262861222236, 'Recharge Seamless Sports Bra', 'recharge-seamless-sports-bra', 'FAMME', 229.00, 'https://picsum.photos/200/300?random=11'),
                                                                       (9262852276572, 'Recharge Seamless Biker Shorts', 'recharge-seamless-biker-shorts', 'FAMME', 249.00, 'https://picsum.photos/200/300?random=12'),
                                                                       (9618451792220, 'Loose Fit Cargo Pants', 'loose-fit-cargo-pants', 'FAMME', 499.00, 'https://picsum.photos/200/300?random=13'),
                                                                       (9618450121052, 'Power Rib Bodysuit', 'power-rib-bodysuit', 'FAMME', 399.00, 'https://picsum.photos/200/300?random=14'),
                                                                       (9262896578908, 'Arise Comfort Pants', 'arise-comfort-pants', 'FAMME', 399.00, 'https://picsum.photos/200/300?random=15'),
                                                                       (9262884127068, 'Arise Comfort Half Zip', 'arise-comfort-half-zip', 'FAMME', 449.00, 'https://picsum.photos/200/300?random=16'),
                                                                       (9262877966684, 'Arise Seamless V-neck', 'arise-seamless-v-neck', 'FAMME', 299.00, 'https://picsum.photos/200/300?random=17'),
                                                                       (9262869545308, 'Arise Seamless Leggings', 'arise-seamless-leggings', 'FAMME', 499.00, 'https://picsum.photos/200/300?random=18'),
                                                                       (9262681194844, 'Essential Crewneck', 'essential-crewneck', 'FAMME', 349.00, 'https://picsum.photos/200/300?random=19'),
                                                                       (9262890615132, 'Arise Comfort Shorts', 'arise-comfort-shorts', 'FAMME', 299.00, 'https://picsum.photos/200/300?random=20'),
                                                                       (9618453496156, 'Power Seamless Bodysuit', 'power-seamless-bodysuit', 'FAMME', 399.00, 'https://picsum.photos/200/300?random=21'),
                                                                       (9262907457884, 'Perform Seamless Tights', 'perform-seamless-tights', 'FAMME', 499.00, 'https://picsum.photos/200/300?random=22'),
                                                                       (9262831829340, 'Elevate Vortex Sports Bra 2', 'elevate-vortex-sports-bra-2', 'FAMME', 299.00, 'https://picsum.photos/200/300?random=23'),
                                                                       (9618449760604, 'Power Rib Longsleeve', 'power-rib-longsleeve', 'FAMME', 299.00, 'https://picsum.photos/200/300?random=24'),
                                                                       (9618454708572, 'Power Seamless Shorts', 'power-seamless-shorts', 'FAMME', 249.00, 'https://picsum.photos/200/300?random=25');
