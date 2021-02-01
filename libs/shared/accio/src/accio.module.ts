import { Module } from '@nestjs/common'
import { AccioService } from './lib/accio.service'

@Module({
  providers: [AccioService],
  exports: [AccioService]
})
export class AccioModule {}
