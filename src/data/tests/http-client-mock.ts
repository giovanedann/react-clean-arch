import {
  HttpPostClient,
  HttpPostParams
} from 'data/protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object

  async post (params: HttpPostParams): Promise<void> {
    this.body = params.body
    this.url = params.url
  }
}
