import { configuration } from '@env'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AccioModule } from '@poc/shared/accio'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    AccioModule
  ]
})
export class AppModule {}
