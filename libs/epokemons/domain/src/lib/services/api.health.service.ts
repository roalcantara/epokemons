import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  HealthIndicator,
  HealthIndicatorResult,
  HttpHealthIndicator
} from '@nestjs/terminus'
import type { ApiConfig } from './config.type'

@Injectable()
export class ApiHealthService extends HealthIndicator {
  get url(): string {
    return String(this.config.get<ApiConfig>('api')?.url)
  }

  constructor(
    private readonly config: ConfigService,
    private readonly dns: HttpHealthIndicator
  ) {
    super()
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    return this.dns.pingCheck('api', this.url)
  }
}
