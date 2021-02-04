import { EpokemonsDomainModule } from '@epokemons/domain'
import { Module } from '@nestjs/common'
import { PokemonController } from './lib/pokemon.controller'

@Module({
  imports: [EpokemonsDomainModule],
  controllers: [PokemonController],
  providers: [PokemonController],
  exports: [EpokemonsDomainModule, PokemonController]
})
export class EpokemonsModule {}
