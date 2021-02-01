import { Injectable } from '@nestjs/common'
import {
  HealthIndicator,
  HealthIndicatorResult,
  HttpHealthIndicator
} from '@nestjs/terminus'
import { ElasticConnection } from './elastic.connection'

@Injectable()
export class ElasticHealthService extends HealthIndicator {
  constructor(
    private readonly conn: ElasticConnection,
    private readonly dns: HttpHealthIndicator
  ) {
    super()
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    return this.dns.pingCheck('elasticsearch', this.conn.path)
  }
}
