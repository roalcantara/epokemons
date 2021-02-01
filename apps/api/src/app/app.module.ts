import { configuration } from '@env'
import { EpokemonsModule } from '@epokemons'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AccioModule } from '@poc/shared/accio'
import { ElasticModule } from '@poc/shared/elastic'
import { PgModule } from '@poc/shared/pg'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    AccioModule,
    PgModule,
    ElasticModule,
    EpokemonsModule
  ]
})
export class AppModule {}
