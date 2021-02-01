import { Module } from '@nestjs/common'
import { AccioModule } from '@poc/shared/accio'
import { ElasticRepository, ElasticConnection } from './lib'

@Module({
  imports: [AccioModule],
  providers: [ElasticConnection, ElasticRepository],
  exports: [ElasticConnection, ElasticRepository]
})
export class ElasticModule {}
