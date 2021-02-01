import { EpokemonsDomainModule } from '@epokemons/domain'
import { Module } from '@nestjs/common'

@Module({
  imports: [EpokemonsDomainModule],
  exports: [EpokemonsDomainModule]
})
export class EpokemonsModule {}
