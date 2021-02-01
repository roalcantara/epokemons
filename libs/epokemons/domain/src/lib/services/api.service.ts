import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AccioService } from '@poc/shared/accio'
import { map } from 'rxjs/operators'
import type { ApiConfig } from './config.type'

type Search<T> = {
  count: number
  next: string
  previous: string
  results: Array<T>
}

@Injectable()
export class ApiService<T> {
  get url(): string {
    return String(this.config.get<ApiConfig>('api')?.url)
  }

  constructor(
    private readonly config: ConfigService,
    private readonly accio: AccioService
  ) {}

  get = (id: number) =>
    this.accio.get<T>([this.url, id].join('/')).pipe(map(res => res as T))

  all = (from = 100, to = 200) =>
    this.accio
      .get<T>(this.url, { params: [{ limit: from }, { offset: to }] })
      .pipe(map((res: Search<T>) => res?.results?.map(row => row)))
}
