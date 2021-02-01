import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { AccioModule } from '@poc/shared/accio'
import {
  ElasticRepository,
  ElasticConnection,
  ElasticHealthService
} from './lib'

@Module({
  imports: [AccioModule, TerminusModule],
  providers: [ElasticConnection, ElasticRepository, ElasticHealthService],
  exports: [ElasticConnection, ElasticRepository, ElasticHealthService]
})
export class ElasticModule {}
