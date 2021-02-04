import { Module } from '@nestjs/common'
import { AccioModule } from '@poc/shared/accio'
import { PgModule } from '@poc/shared/pg'
import { PokemonRepository } from './lib/repositories'
import { ApiService } from './lib/services'

@Module({
  imports: [AccioModule, PgModule],
  providers: [ApiService, PokemonRepository],
  exports: [ApiService, PokemonRepository]
})
export class EpokemonsDomainModule {}
