import { Injectable } from '@nestjs/common'
import { switchMap } from 'rxjs/operators'
import type { Pokemon } from '../models/pokemon.model'
import { PokemonRepository, PokemonSearchRepository } from '../repositories'
import { ApiService } from './api.service'

@Injectable()
export class PokemonService {
  constructor(
    readonly api: ApiService<Pokemon>,
    readonly repository: PokemonRepository,
    readonly search: PokemonSearchRepository
  ) {}

  importBy = (id: number) =>
    this.api
      .get(id)
      .pipe(switchMap(instance => this.repository.create(instance)))

  onCreateIndexDocument = () =>
    this.repository
      .onCreate()
      .pipe(switchMap(event => this.search.create(event.data)))
}
