import {
  HttpPostClient,
  HttpPostParams
} from 'data/protocols/http/http-post-client'
import { HttpResponse, HttpStatusCode } from 'data/protocols/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.unauthorized
  }

  async post (params: HttpPostParams): Promise<HttpResponse> {
    this.body = params.body
    this.url = params.url

    return await Promise.resolve(this.response)
  }
}
