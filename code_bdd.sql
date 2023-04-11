drop table if exists vetements;
drop table if exists categorie;


CREATE TABLE categorie (
    cat VARCHAR(50) PRIMARY KEY
);


CREATE TABLE vetements (
id SERIAL PRIMARY KEY NOT NULL,
nom VARCHAR(100),
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

INSERT INTO vetements VALUES 
('Chemise à carreaux rouge', 19.99, 'Chemise','S',36),
('Chemise à carreaux rouge', 19.99, 'Chemise','L',15),
('Jeans noir', 24.99, 'Jeans','XL',125);

INSERT INTO vetements VALUES 
('Sweat oni', 64.99, 'Sweat','M'),
('Jogging noir nike', 29.99, 'Jogging', 'XXL');