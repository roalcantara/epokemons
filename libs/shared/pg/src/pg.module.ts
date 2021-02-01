import { Module } from '@nestjs/common'
import { PgConnection } from './lib/pg.connection'
import { PgRepository } from './lib/pg.repository'

@Module({
  providers: [PgConnection, PgRepository],
  exports: [PgConnection, PgRepository]
})
export class PgModule {}
