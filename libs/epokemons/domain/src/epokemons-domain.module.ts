import { Module } from '@nestjs/common'
import { AccioModule } from '@poc/shared/accio'
import { ApiService } from './lib/services'

@Module({
  imports: [AccioModule],
  providers: [ApiService],
  exports: [ApiService]
})
export class EpokemonsDomainModule {}
