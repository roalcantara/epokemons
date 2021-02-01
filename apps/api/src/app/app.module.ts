import { configuration } from '@env'
import { EpokemonsModule } from '@epokemons'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AccioModule } from '@poc/shared/accio'
import { PgModule } from '@poc/shared/pg'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    AccioModule,
    PgModule,
    EpokemonsModule
  ]
})
export class AppModule {}
