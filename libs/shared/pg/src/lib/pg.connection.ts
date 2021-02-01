import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Pool, PoolClient } from 'pg'
import { Observable, Subscriber } from 'rxjs'

export type DbConfig = {
  provider: string
  database: string
  host: string
  port: number
  user: string
  pwd: string
  max: number
}

export type DbConn = {
  connected: boolean
  reason?: Error
}

type Callback<T> = (
  observer: Subscriber<T>,
  err: Error,
  client?: PoolClient
) => void

@Injectable()
export class PgConnection {
  constructor(private config: ConfigService) {}

  get env(): DbConfig | undefined {
    return this.config.get<DbConfig>('db')
  }

  get connString(): string {
    return `${this.env?.provider}://${this.env?.user}:${this.env?.pwd}@${this.env?.host}:${this.env?.port}/${this.env?.database}`
  }

  get pool(): Pool {
    return new Pool({
      max: this.env?.max,
      connectionString: this.connString
    })
  }

  private conn = <T>(handler: Callback<T>) =>
    new Observable<T>(observer => {
      try {
        this.pool.connect((err, client) => {
          handler(observer, err, client)
        })
      } catch (e) {
        handler(observer, e)
        this.pool?.end()?.then(() => observer.complete())
      }
    })

  check = () =>
    this.conn<DbConn>((observer, err) => {
      observer.next({ connected: !err, reason: err })
      this.pool?.end()?.then(() => observer.complete())
    })

  connect = () =>
    this.conn<PoolClient>((observer, err, client) => {
      err ? observer.error(err) : observer.next(client)
      this.pool?.end()?.then(() => observer.complete())
    })
}
