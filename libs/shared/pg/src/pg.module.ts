import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { PgConnection } from './lib/pg.connection'
import { PgHealthService } from './lib/pg.health.service'
import { PgRepository } from './lib/pg.repository'

@Module({
  imports: [TerminusModule],
  providers: [PgConnection, PgRepository, PgHealthService],
  exports: [PgConnection, PgRepository, PgHealthService]
})
export class PgModule {}
