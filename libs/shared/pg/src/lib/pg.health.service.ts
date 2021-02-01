import { Injectable } from '@nestjs/common'
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult
} from '@nestjs/terminus'
import { PgConnection } from './pg.connection'

@Injectable()
export class PgHealthService extends HealthIndicator {
  constructor(private readonly conn: PgConnection) {
    super()
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    const res = await this.conn.check().toPromise()

    const result = this.getStatus('database', res?.connected ?? false, {
      message: res?.reason?.message
    })

    if (res?.connected) return result

    throw new HealthCheckError('Database', result)
  }
}
