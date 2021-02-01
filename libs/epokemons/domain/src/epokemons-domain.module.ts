import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { AccioModule } from '@poc/shared/accio'
import { ElasticModule } from '@poc/shared/elastic'
import { PgModule } from '@poc/shared/pg'
import { PokemonRepository, PokemonSearchRepository } from './lib/repositories'
import { ApiService, PokemonService, ApiHealthService } from './lib/services'

@Module({
  imports: [AccioModule, PgModule, ElasticModule, TerminusModule],
  providers: [
    ApiService,
    PokemonRepository,
    PokemonSearchRepository,
    PokemonService,
    ApiHealthService
  ],
  exports: [
    ApiService,
    PokemonRepository,
    PokemonSearchRepository,
    PokemonService,
    ApiHealthService
  ]
})
export class EpokemonsDomainModule {}
