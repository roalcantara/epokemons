import { Module } from '@nestjs/common'
import { AccioModule } from '@poc/shared/accio'
import { ElasticModule } from '@poc/shared/elastic'
import { PgModule } from '@poc/shared/pg'
import { PokemonRepository, PokemonSearchRepository } from './lib/repositories'
import { ApiService, PokemonService } from './lib/services'

@Module({
  imports: [AccioModule, PgModule, ElasticModule],
  providers: [
    ApiService,
    PokemonRepository,
    PokemonSearchRepository,
    PokemonService
  ],
  exports: [
    ApiService,
    PokemonRepository,
    PokemonSearchRepository,
    PokemonService
  ]
})
export class EpokemonsDomainModule {}
