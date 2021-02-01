import {
  PokemonService,
  Pokemon,
  ApiService,
  PokemonRepository,
  PokemonSearchRepository
} from '@epokemons/domain'
import { Controller, Get, Param, Post } from '@nestjs/common'

@Controller()
export class PokemonController {
  constructor(
    private readonly api: ApiService<Pokemon>,
    private readonly repository: PokemonRepository,
    private readonly search: PokemonSearchRepository,
    private readonly service: PokemonService
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

  @Post('pokemons/:id')
  async import(@Param('id') id: number): Promise<Pokemon> {
    return this.service.importBy(id).toPromise()
  }

  @Get('listen')
  async listen(): Promise<string> {
    this.service.onCreateIndexDocument().subscribe(instance => {
      console.log(`[GET /listen]: Document Indexed! ✔✔`, { instance })
    })

    return `Start listening for "${this.service.repository.event}" notifications ✔`
  }
}
