import { Injectable } from '@nestjs/common'
import { ElasticRepository } from '@poc/shared/elastic'
import { Pokemon } from '../models/pokemon.model'

@Injectable()
export class PokemonSearchRepository {
  constructor(private readonly elastic: ElasticRepository<Pokemon>) {}

  list = () => this.elastic.search(Pokemon.RESOURCE)

  get = <K>(id: K) => this.elastic.find(Pokemon.RESOURCE, { id: String(id) })
}
