DROP TABLE IF EXISTS pokemons CASCADE;

CREATE TABLE pokemons (
  id integer NOT NULL PRIMARY KEY,
  name text NOT NULL,
  height integer NOT NULL,
  weight integer NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION notify_upsert_pokemon()
  RETURNS TRIGGER AS $BODY$ BEGIN
    PERFORM pg_notify('upsert_pokemon', row_to_json(NEW)::text);
    RETURN NULL;
  END;
  $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

CREATE TRIGGER on_insert_or_update_pokemon
  AFTER INSERT OR UPDATE ON pokemons
  FOR EACH ROW EXECUTE PROCEDURE notify_upsert_pokemon();
