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

INSERT INTO categorie VALUES 
('Chemise'),
('Veste'),
('Tshirt'),
('Sweat'),
('Jeans'),
('Jogging'),
('Accesoires');

INSERT INTO vetements (nom, chemin, prix, type_vetement, taille, stock) VALUES 
('Chemise à carreaux rouge', '/img_vetements/chemise_carreaux_rouges.jpg', 19.99, 'Chemise','S',36),
('Chemise à carreaux rouge', '/img_vetements/chemise_carreaux_rouges.jpg', 19.99, 'Chemise','L',15),
('Jeans noir','/img_vetements/jeans_noir.jpg', 24.99, 'Jeans','XL',125);

INSERT INTO vetements (nom, chemin, prix, type_vetement, taille) VALUES 
('Sweat oni','/img_vetements/sweat_oni.webp', 64.99, 'Sweat','M'),
('Jogging noir nike','/img_vetements/joggings_noir_nike.jpg', 29.99, 'Jogging', 'XXL');