import { EpokemonsDomainModule } from '@epokemons/domain'
import { Module } from '@nestjs/common'
import { PgModule } from '@poc/shared/pg'
import { PokemonController } from './lib/pokemon.controller'

@Module({
  imports: [EpokemonsDomainModule, PgModule],
  controllers: [PokemonController],
  providers: [PokemonController],
  exports: [EpokemonsDomainModule, PokemonController]
})
export class EpokemonsModule {}
