import {
  type HttpPostClient,
  type HttpPostParams,
  type HttpResponse,
  HttpStatusCode
} from 'data/protocols/http'

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.body = params.body
    this.url = params.url

    return await Promise.resolve(this.response)
  }
}
