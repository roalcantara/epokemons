/* eslint-disable no-underscore-dangle */
import { Injectable } from '@nestjs/common'
import { AccioService } from '@poc/shared/accio'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { ElasticConnection } from './elastic.connection'
import type { DocumentSaved, SearchParams, SearchResponse } from './types'

@Injectable()
export class ElasticRepository<T> {
  constructor(
    private readonly conn: ElasticConnection,
    private readonly accio: AccioService
  ) {}

  create = (index: string, args: SearchParams<T>) =>
    this.accio.post<T>(this.path(index, args?.id), this.parse(args)).pipe(
      catchError(err => throwError(err)),
      map((res: DocumentSaved) => res._id)
    )

  search = (index: string, args: SearchParams<T> = {}): Observable<Array<T>> =>
    this.accio.post<T>(this.path(index, '_search'), this.parse(args)).pipe(
      catchError(err => throwError(err)),
      map((res: SearchResponse<T>) => res?.hits?.hits?.map(row => row._source))
    )

  get = (index: string, args: SearchParams<T>) =>
    this.accio
      .get<T>(this.path(index, args.id))
      .pipe(catchError(err => throwError(err)))

  find = (index: string, args: SearchParams<T>) =>
    this.accio
      .post<T>(this.path(index, '_search'), this.parse({ ...args, size: 1 }))
      .pipe(
        catchError(err => throwError(err)),
        map((res: SearchResponse<T>) =>
          res?.hits?.hits?.map(row => row._source)?.pop()
        )
      )

  private buildBody = ({ size, body, term }: SearchParams<T>) => {
    if (body) return body

    const result: Record<string, unknown> = {}
    if (size && size > 0) result.size = size
    if (term) result.query = { term }

    return result
  }

  private parse = (args: SearchParams<T>) => ({
    json: this.buildBody(args),
    params: args.params
  })

  private path = (index: string, ...sufix: Array<string | T | undefined>) =>
    [this.conn.path, index, '_doc', ...sufix].filter(item => !!item).join('/')
}
