import { Injectable, Optional } from '@nestjs/common'
import { PgRepository } from '@poc/shared/pg'
import { mapTo } from 'rxjs/operators'
import { Pokemon } from '../models/pokemon.model'

@Injectable()
export class PokemonRepository {
  constructor(
    private readonly db: PgRepository<Pokemon>,
    @Optional() readonly event = 'upsert_pokemon'
  ) {}

  list = () => this.db.select(Pokemon.RESOURCE)

  get = (id: number) => this.db.get(Pokemon.RESOURCE, id)

  create = (instance: Pokemon) =>
    this.db
      .insert(
        `INSERT INTO ${Pokemon.RESOURCE}(id,name,height,weight)\
              VALUES(${instance.id}, '${instance.name}', ${instance.height}, ${instance.weight});`
      )
      .pipe(mapTo(new Pokemon({ ...instance })))

  onCreate = () => this.db.listen(this.event)
}
