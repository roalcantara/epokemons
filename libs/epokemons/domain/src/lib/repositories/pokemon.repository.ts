import { Injectable } from '@nestjs/common'
import { PgRepository } from '@poc/shared/pg'
import { Pokemon } from '../models/pokemon.model'

@Injectable()
export class PokemonRepository {
  constructor(private readonly db: PgRepository<Pokemon>) {}

  list = () => this.db.select(Pokemon.RESOURCE)

  get = (id: number) => this.db.get(Pokemon.RESOURCE, id)
}
