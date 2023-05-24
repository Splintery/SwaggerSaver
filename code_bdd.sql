drop table if exists panier CASCADE;
drop table if exists vetements CASCADE;
drop table if exists categorie CASCADE;


CREATE TABLE categorie (
    cat VARCHAR(50) PRIMARY KEY
);


CREATE TABLE vetements (
id SERIAL PRIMARY KEY NOT NULL,
nom VARCHAR(100),
chemin VARCHAR(50),
prix DECIMAL(10, 2),
type_vetement VARCHAR(50),
taille VARCHAR(4),
stock INT DEFAULT 0,
FOREIGN KEY (type_vetement) REFERENCES categorie(cat)
);

CREATE TABLE panier (
    id SERIAL PRIMARY KEY NOT NULL,
    id_vetement INTEGER,
    FOREIGN KEY (id_vetement) REFERENCES vetements(id)
);

-- CREATE TABLE combinaison (
--     nom_combinaison VARCHAR(50),
--     id INTEGER,
--     prix_c DECIMAL(10,2),
--     FOREIGN KEY (id) REFERENCES vetements(id)
-- );

INSERT INTO categorie VALUES 
('Chemise'),
('Veste'),
('Tshirt'),
('Sweat'),
('Jeans'),
('Jogging'),
('Accessoire');


-- Les chemises :
INSERT INTO vetements (nom, chemin, prix, type_vetement, taille, stock) VALUES
('Chemise dakota', '/img_vetements/chemise_dakota.webp', 29.99, 'Chemise', 'L', 25),
('Chemise dakota', '/img_vetements/chemise_dakota.webp', 29.99, 'Chemise', 'S', 25),
('Chemise anaheim', '/img_vetements/chemise_anaheim.jpeg', 19.99, 'Chemise', 'M', 14),
('Chemise helleson', '/img_vetements/chemise_helleson.webp', 29.99, 'Chemise', 'L', 4),
('Chemise miller', '/img_vetements/chemise_miller.jpeg', 39.99, 'Chemise', 'M', 9),
('Chemise Bayview', '/img_vetements/chemise_bayview.webp', 9.99, 'Chemise', 'S', 10),
('Chemise Miami', '/img_vetements/chemise_miami.webp', 7.99, 'Chemise', 'L', 7),
('Chemise Miami', '/img_vetements/chemise_miami.webp', 7.99, 'Chemise', 'M', 7);

-- Les sweat :
INSERT INTO vetements (nom, chemin, prix, type_vetement, taille, stock) VALUES
('sweat alva', '/img_vetements/sweat_alva.webp', 5.99, 'Sweat', 'M', 69),
('sweat quartier', '/img_vetements/sweat_quartier.jpeg', 14.99, 'Sweat', 'L', 7),
('sweat sidestripe', '/img_vetements/sweat_sidestripe.jpeg', 24.99, 'Sweat', 'M', 27);

-- Les vestes :
INSERT INTO vetements (nom, chemin, prix, type_vetement, taille, stock) VALUES
('veste drill', '/img_vetements/veste_drill.jpeg', 34.99, 'Veste', 'S', 2),
('veste torrey', '/img_vetements/veste_torrey.webp', 19.99, 'Veste', 'L', 1);

-- Les joggings :
INSERT INTO vetements (nom, chemin, prix, type_vetement, taille, stock) VALUES
('Jogging TIE DYE', '/img_vetements/jogging1.jpeg', 34.99, 'Jogging', 'S', 123),
('Jogging TIE DYE', '/img_vetements/jogging1.jpeg', 34.99, 'Jogging', 'L', 24),
('Jogging bleu', '/img_vetements/jogging2.jpeg', 24.99, 'Jogging', 'XL', 9),
('Jogging ComfyCush', '/img_vetements/jogging3.jpeg', 34.99, 'Jogging', 'S', 2),
('Jogging Peace of Mind', '/img_vetements/jogging4.jpeg', 44.99, 'Jogging', 'S', 10),
('Jogging Paisley Check', '/img_vetements/jogging5.jpeg', 34.99, 'Jogging', 'M', 71);

-- Les accessoires :
INSERT INTO vetements (nom, chemin, prix, type_vetement, taille, stock) VALUES
('Bob', '/img_vetements/bob.jpeg', 14.99, 'Accessoire', 'S', 123),
('Ceinture à carreau noir', '/img_vetements/ceinture1.webp', 12.99, 'Accessoire', 'S', 1),
('Lunettes', '/img_vetements/lunettes1.webp', 34.99, 'Accessoire', 'S', 33),
('Sac gris', '/img_vetements/sac1.webp', 25, 'Accessoire', 'S', 23),
('Sac', '/img_vetements/sac2.webp', 49.99, 'Accessoire', 'S', 13);

-- Les Tshirt :
INSERT INTO vetements (nom, chemin, prix, type_vetement, taille, stock) VALUES
('Tshirt gris', '/img_vetements/tshirt_gris.jpeg', 9.99, 'Tshirt', 'S', 42),
('Tshirt gris', '/img_vetements/tshirt_gris.jpeg', 9.99, 'Tshirt', 'L', 23),
('Tshirt gris', '/img_vetements/tshirt_gris.jpeg', 9.99, 'Tshirt', 'XL', 4),
('Tshirt Haribo', '/img_vetements/tshirt_haribo.webp', 15.99, 'Tshirt', 'S', 20),
('Tshirt noir', '/img_vetements/tshirt_noir.jpeg', 9.99, 'Tshirt', 'S', 422),
('Tshirt noir', '/img_vetements/tshirt_noir.jpeg', 9.99, 'Tshirt', 'XL', 132),
('Tshirt Oversize', '/img_vetements/tshirt_oversize.jpeg', 12.99, 'Tshirt', 'S', 28),
('Tshirt Oversize', '/img_vetements/tshirt_oversize.jpeg', 12.99, 'Tshirt', 'S', 231),
('Tshirt Peaces', '/img_vetements/tshirt_peaces.jpeg', 15.99, 'Tshirt', 'S', 27),
('Tshirt Peaces', '/img_vetements/tshirt_peaces.jpeg', 15.99, 'Tshirt', 'XL', 9),
('Tshirt rouge', '/img_vetements/tshirt_rouge.webp', 9.99, 'Tshirt', 'S', 4),
('Tshirt Shroomscape', '/img_vetements/tshirt_shroomscape.webp', 20.99, 'Tshirt', 'M', 42),
('Tshirt wash', '/img_vetements/tshirt_wash.jpeg', 14.99, 'Tshirt', 'S', 41),
('Tshirt wash', '/img_vetements/tshirt_wash.jpeg', 14.99, 'Tshirt', 'XXL', 42);

-- Les Jeans :
INSERT INTO vetements (nom, chemin, prix, type_vetement, taille, stock) VALUES
('Jeans ample', '/img_vetements/jeans_ample.webp', 29.99, 'Jeans', 'S', 123),
('Jeans ample', '/img_vetements/jeans_ample.webp', 29.99, 'Jeans', 'XS', 90),
('Jeans Denim', '/img_vetements/Jeans_denim.webp', 29.99, 'Jeans', 'S', 32);

-- Les Combinaisons :
-- INSERT INTO combinaison (nom, id, prix) VALUES
-- ('Combinaison classique 1', 17, 39.99),
-- ('Combinaison classique 1', 27, 39.99),
-- ('Combinaison classique 1', 13, 39.99),
-- ('Combinaison business 1', 41, 59.99),
-- ('Combinaison business 1', 4, 59.99),
-- ('Combinaison business 1', 22, 59.99);