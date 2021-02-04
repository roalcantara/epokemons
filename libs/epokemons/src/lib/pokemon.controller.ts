import { ApiService, Pokemon } from '@epokemons/domain'
import { Controller, Get, Param } from '@nestjs/common'

@Controller()
export class PokemonController {
  constructor(private readonly api: ApiService<Pokemon>) {}

  @Get('pokeapi')
  async all(): Promise<Array<Pokemon>> {
    return this.api.all().toPromise()
  }

  @Get('pokeapi/:id')
  async get(@Param('id') id: number): Promise<Pokemon> {
    return this.api.get(id).toPromise()
  }
}
