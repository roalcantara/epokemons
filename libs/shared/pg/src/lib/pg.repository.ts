import { Injectable } from '@nestjs/common'
import type { QueryResult, QueryConfig } from 'pg'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { PgConnection } from './pg.connection'

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

  select = (table: string) =>
    this.query(`SELECT * FROM ${table}`).pipe(
      map(res => res?.rows?.map(row => row as T) ?? [])
    )

  get = <K>(table: string, id: K) =>
    this.query(`SELECT * FROM ${table} WHERE id=${id}`).pipe(
      map(res => res?.rows?.map(row => row as T)?.pop())
    )
}
