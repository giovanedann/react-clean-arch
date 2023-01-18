export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  notFound = 404,
  serverError = 500,
  unauthorized = 401
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
