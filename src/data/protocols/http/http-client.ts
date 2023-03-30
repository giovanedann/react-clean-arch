export type HttpMethods = 'get' | 'post' | 'put' | 'delete'

export type HttpRequest = {
  url: string
  headers?: any
  body?: any
  method: HttpMethods
}

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  notFound = 404,
  serverError = 500,
  unauthorized = 401,
  forbidden = 403
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}

export interface HttpClient<T> {
  request: (data: HttpRequest) => Promise<HttpResponse<T>>
}
