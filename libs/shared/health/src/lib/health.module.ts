import { EpokemonsModule } from '@epokemons'
import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { ElasticModule } from '@poc/shared/elastic'
import { PgModule } from '@poc/shared/pg'
import { HealthController } from './health.controller'

@Module({
  imports: [TerminusModule, EpokemonsModule, PgModule, ElasticModule],
  controllers: [HealthController],
  providers: [HealthController],
  exports: [HealthController]
})
export class HealthModule {}
