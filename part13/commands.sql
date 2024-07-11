CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Geronimo Stilton', 'https://www.clubgeronimostilton.es/libro/124-en-el-reino-de-la-fantasia', 'En el Reino de la Fantasia');

INSERT INTO blogs (author, url, title) VALUES ('Jordi Wild', 'https://www.casadellibro.com/libro-asi-es-la-puta-vida/9788417809904/13209766', 'Asi es la puta vida');