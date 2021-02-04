import { Injectable } from '@nestjs/common'
import { switchMap } from 'rxjs/operators'
import type { Pokemon } from '../models/pokemon.model'
import { PokemonRepository } from '../repositories'
import { ApiService } from './api.service'

@Injectable()
export class PokemonService {
  constructor(
    readonly api: ApiService<Pokemon>,
    readonly repository: PokemonRepository
  ) {}

  importBy = (id: number) =>
    this.api
      .get(id)
      .pipe(switchMap(instance => this.repository.create(instance)))
}
