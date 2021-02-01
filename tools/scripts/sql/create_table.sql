DROP TABLE IF EXISTS pokemons CASCADE;

CREATE TABLE pokemons (
  id integer NOT NULL PRIMARY KEY,
  name text NOT NULL,
  height integer NOT NULL,
  weight integer NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now()
);
