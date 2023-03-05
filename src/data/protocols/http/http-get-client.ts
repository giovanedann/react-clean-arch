import { type HttpResponse } from './http-response'

export type HttpGetParams = {
  url: string
}

export interface HttpGetClient<T> {
  get: (params: HttpGetParams) => Promise<HttpResponse<T>>
}
