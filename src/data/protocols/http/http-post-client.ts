import { type HttpResponse } from '.'

export type HttpPostParams<T = any> = {
  url: string
  body?: T
}

export interface HttpPostClient<T = any, R = any> {
  post: (params: HttpPostParams<T>) => Promise<HttpResponse<R>>
}
