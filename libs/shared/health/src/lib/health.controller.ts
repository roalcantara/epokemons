import { ApiHealthService } from '@epokemons/domain'
import { Controller, Get } from '@nestjs/common'
import { HealthCheckService, HealthCheck } from '@nestjs/terminus'
import { ElasticHealthService } from '@poc/shared/elastic'
import { PgHealthService } from '@poc/shared/pg'

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly api: ApiHealthService,
    private readonly pg: PgHealthService,
    private readonly elastic: ElasticHealthService
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.api.isHealthy(),
      () => this.pg.isHealthy(),
      () => this.elastic.isHealthy()
    ])
  }
}
