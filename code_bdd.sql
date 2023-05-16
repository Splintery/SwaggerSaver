drop table if exists panier;
drop table if exists vetements;
drop table if exists categorie;


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
    id_vetement INTEGER,
    FOREIGN KEY (id_vetement) REFERENCES vetements(id)
);

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
('Chemise anaheim', '/img_vetements/chemise_anaheim.jpeg', 19.99, 'Chemise', 'M', 14),
('Chemise helleson', '/img_vetements/chemise_helleson.webp', 29.99, 'Chemise', 'L', 4),
('Chemise miller', '/img_vetements/chemise_miller.jpeg', 39.99, 'Chemise', 'M', 9),
('Chemise Bayview', '/img_vetements/chemise_bayview.webp', 9.99, 'Chemise', 'S', 10),
('Chemise Miami', '/img_vetements/chemise_miami.webp', 7.99, 'Chemise', 'L', 7);

-- Les sweat :
INSERT INTO vetements (nom, chemin, prix, type_vetement, taille, stock) VALUES
('sweat alva', '/img_vetements/sweat_alva.webp', 5.99, 'Sweat', 'M', 3),
('sweat quartier', '/img_vetements/sweat_quartier.jpeg', 14.99, 'Sweat', 'L', 7),
('sweat sidestripe', '/img_vetements/sweat_sidestripe.jpeg', 24.99, 'Sweat', 'M', 27);

-- Les vestes :
INSERT INTO vetements (nom, chemin, prix, type_vetement, taille, stock) VALUES
('veste drill', '/img_vetements/veste_drill.jpeg', 34.99, 'Veste', 'S', 2),
('veste torrey', '/img_vetements/veste_torrey.webp', 19.99, 'Veste', 'L', 1);

INSERT INTO panier (id_vetement) VALUES 
(1),
(4);