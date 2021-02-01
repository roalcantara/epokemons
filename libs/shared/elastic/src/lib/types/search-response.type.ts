import type { Document } from './document.type'

export type SearchResponse<T> = {
  hits: {
    hits: Array<Document<T>>
  }
}
