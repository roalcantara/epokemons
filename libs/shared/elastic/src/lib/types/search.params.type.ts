export type SearchParams<T> = Partial<{
  size: number
  params: Array<Record<string, string | number>>
  body: T | Record<string, unknown>
  term: Record<string, unknown>
  id: string
}>
