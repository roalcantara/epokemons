export type Document<T> = {
  _index: string
  _type: string
  _id: string
  _score: number
  _source: T
}
