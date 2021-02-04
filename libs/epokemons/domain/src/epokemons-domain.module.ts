import { Module } from '@nestjs/common'
import { AccioModule } from '@poc/shared/accio'
import { ElasticModule } from '@poc/shared/elastic'
import { PgModule } from '@poc/shared/pg'
import { PokemonRepository, PokemonSearchRepository } from './lib/repositories'
import { ApiService } from './lib/services'

@Module({
  imports: [AccioModule, PgModule, ElasticModule],
  providers: [ApiService, PokemonRepository, PokemonSearchRepository],
  exports: [ApiService, PokemonRepository, PokemonSearchRepository]
})
export class EpokemonsDomainModule {}
