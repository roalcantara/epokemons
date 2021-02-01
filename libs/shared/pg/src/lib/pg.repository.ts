import { Injectable } from '@nestjs/common'
import type { QueryResult, QueryConfig } from 'pg'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { PgConnection } from './pg.connection'

export type Event<T> = {
  name: string
  data: T
}

@Injectable()
export class PgRepository<T> {
  constructor(private conn: PgConnection) {}

  private query = (queryTextOrConfig: string | QueryConfig<T[]>) =>
    this.conn.connect().pipe(
      switchMap(
        client =>
          new Observable<QueryResult<T>>(observer =>
            client.query(queryTextOrConfig, (err, result) => {
              err ? observer.error(err) : observer.next(result)
              this.conn.pool?.end()?.then(() => observer.complete())
            })
          )
      )
    )

  insert = (queryTextOrConfig: string) => this.query(queryTextOrConfig)

  listen = (event: string) =>
    this.conn.connect().pipe(
      switchMap(
        client =>
          new Observable<Event<T>>(observer => {
            client
              .on('notification', msg =>
                observer.next({
                  name: event,
                  data: JSON.parse(msg?.payload ?? '') as T
                })
              )
              .on('error', observer.error)
              .on('end', observer.complete)
              .query(`LISTEN ${event}`)
          })
      )
    )

  select = (table: string) =>
    this.query(`SELECT * FROM ${table}`).pipe(
      map(res => res?.rows?.map(row => row as T) ?? [])
    )

  get = <K>(table: string, id: K) =>
    this.query(`SELECT * FROM ${table} WHERE id=${id}`).pipe(
      map(res => res?.rows?.map(row => row as T)?.pop())
    )
}
