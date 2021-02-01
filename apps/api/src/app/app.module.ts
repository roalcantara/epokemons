import { configuration } from '@env'
import { EpokemonsModule } from '@epokemons'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AccioModule } from '@poc/shared/accio'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    AccioModule,
    EpokemonsModule
  ]
})
export class AppModule {}
