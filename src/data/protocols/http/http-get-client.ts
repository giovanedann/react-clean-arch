import { type HttpResponse } from './http-response'

export type HttpGetParams = {
  url: string
  headers?: any
}

export interface HttpGetClient<T> {
  get: (params: HttpGetParams) => Promise<HttpResponse<T>>
}
