import { configuration } from '@env'
import { EpokemonsModule } from '@epokemons'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'
import { AccioModule } from '@poc/shared/accio'
import { ElasticModule } from '@poc/shared/elastic'
import { HealthModule } from '@poc/shared/health'
import { PgModule } from '@poc/shared/pg'

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    AccioModule,
    PgModule,
    ElasticModule,
    EpokemonsModule,
    HealthModule
  ]
})
export class AppModule {}
