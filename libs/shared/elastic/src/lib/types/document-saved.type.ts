export type DocumentSaved = {
  _index: string
  _type: string
  _id: string
  _version: number
  result: 'created' | 'deleted' | 'updated'
  _shards: {
    total: number
    successful: number
    failed: number
  }
  _seq_no: number
  _primary_term: number
}
