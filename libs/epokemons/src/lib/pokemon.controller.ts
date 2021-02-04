import {
  ApiService,
  Pokemon,
  PokemonRepository,
  PokemonSearchRepository
} from '@epokemons/domain'
import { Controller, Get, Param } from '@nestjs/common'

@Controller()
export class PokemonController {
  constructor(
    private readonly api: ApiService<Pokemon>,
    private readonly repository: PokemonRepository,
    private readonly search: PokemonSearchRepository
  ) {}

  @Get('pokeapi')
  async all(): Promise<Array<Pokemon>> {
    return this.api.all().toPromise()
  }

  @Get('pokeapi/:id')
  async get(@Param('id') id: number): Promise<Pokemon> {
    return this.api.get(id).toPromise()
  }

  @Get('pokemons')
  async list(): Promise<Array<Pokemon>> {
    return this.repository.list().toPromise()
  }

  @Get('pokemons/:id')
  async show(@Param('id') id: number): Promise<Pokemon | undefined> {
    return this.repository.get(id).toPromise()
  }

  @Get('search')
  async findAll(): Promise<Array<Pokemon>> {
    return this.search.list().toPromise()
  }

  @Get('search/:id')
  async findById(@Param('id') id: number): Promise<Pokemon | undefined> {
    return this.search.get(id).toPromise()
  }
}
