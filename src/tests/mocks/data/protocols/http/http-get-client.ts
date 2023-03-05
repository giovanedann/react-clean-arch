import {
  type HttpGetParams,
  type HttpGetClient,
  type HttpResponse,
  HttpStatusCode
} from 'data/protocols/http'

export class HttpGetClientSpy<T> implements HttpGetClient<T> {
  url: string = ''
  response: HttpResponse<T> = {
    statusCode: HttpStatusCode.ok
  }

  async get({ url }: HttpGetParams): Promise<HttpResponse<T>> {
    this.url = url
    return this.response
  }
}
