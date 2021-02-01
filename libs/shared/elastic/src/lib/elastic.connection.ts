import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export type ElastichConfig = {
  host: string
  port: number
}

@Injectable()
export class ElasticConnection {
  constructor(private readonly config: ConfigService) {}

  get env(): ElastichConfig | undefined {
    return this.config.get<ElastichConfig>('el')
  }

  get host(): string | undefined {
    return this.env?.host
  }

  get port(): number | undefined {
    return this.env?.port
  }

  get path(): string {
    return [`http://${this.host}`, this.port].join(':')
  }
}
