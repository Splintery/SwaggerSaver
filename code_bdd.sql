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
('Accesoires');

INSERT INTO vetements (nom, chemin, prix, type_vetement, taille, stock) VALUES 
('Chemise à carreaux rouge', '/img_vetements/chemise_carreaux_rouges.jpg', 19.99, 'Chemise','S',36),
('Chemise à carreaux rouge', '/img_vetements/chemise_carreaux_rouges.jpg', 19.99, 'Chemise','L',15),
('Jogging noir nike','/img_vetements/joggings_noir_nike.jpg', 29.99, 'Jogging', 'XXL',216),
('Chemise rouge', '/img_vetements/chemise_rouge.png', 19.99, 'Chemise','L',15),
('Chemise rouge', '/img_vetements/chemise_rouge.png', 19.99, 'Chemise','M',19),
('Chemise blanche', '/img_vetements/chemise_blanche.png', 19.99, 'Chemise','S',40),
('Chemise bleu', '/img_vetements/chemise_bleu.png', 19.99, 'Chemise','L',35),
('Jeans noir','/img_vetements/jeans_noir.png', 24.99, 'Jeans','XL',125);

INSERT INTO vetements (nom, chemin, prix, type_vetement, taille) VALUES 
('Chemise rouge', '/img_vetements/chemise_rouge.png', 19.99, 'Chemise','S'),
('Jogging noir nike','/img_vetements/joggings_noir_nike.jpg', 29.99, 'Jogging', 'XXL'),
('Chemise rouge', '/img_vetements/chemise_rouge.png', 19.99, 'Chemise','S');