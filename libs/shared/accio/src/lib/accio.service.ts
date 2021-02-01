import fetch from 'cross-fetch'
import { of, throwError } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { onError } from './accio.on-error'

export type RequestArgs<T> = Partial<
  RequestInit & {
    params: Array<Record<string, string | number>>
    json: T | Record<string, unknown>
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  }
>

export class AccioService {
  get = <T>(path: string, args: RequestArgs<T> = {}) =>
    this.http<T>(path, { ...args, method: 'GET' })

  post = <T>(path: string, args: RequestArgs<T> = {}) =>
    this.http<T>(path, { ...args, method: 'POST' })

  put = <T>(path: string, args: RequestArgs<T> = {}) =>
    this.http<T>(path, { ...args, method: 'PUT' })

  delete = <T>(path: string, args: RequestArgs<T> = {}) =>
    this.http<T>(path, { ...args, method: 'DELETE' })

  private http = <T>(request: RequestInfo, params: RequestArgs<T>) =>
    of(this.parse(request, params)).pipe(
      switchMap(({ path, args }) => fetch(path, args)),
      switchMap(res =>
        res.ok ? res.json() : throwError(onError(request, params, res))
      )
    )

  private parse = <T>(
    path: RequestInfo,
    { method, params, headers, body, json }: RequestArgs<T>
  ) => ({
    path: [path, this.toParams(params)].filter(item => item !== '').join('?'),
    args: {
      method,
      headers: headers ?? { 'Content-Type': 'application/json' },
      body: this.buildBody({ method, body, json })
    }
  })

  private buildBody = <T>({ method, body, json }: RequestArgs<T>) => {
    if (method && !['GET', 'PUT'].includes(method)) {
      return JSON.stringify(body ?? json ?? {})
    }
  }

  private toParams = (params?: Array<Record<string, string | number>>) =>
    (params ?? [])
      .reduce<URLSearchParams>((reduced, current) => {
        if (current) {
          const tuple = Array.from(Object.entries(current))
          reduced.append(String(tuple[0]), String(tuple[1]))
        }

        return reduced
      }, new URLSearchParams())
      .toString()
      .trim()
}
