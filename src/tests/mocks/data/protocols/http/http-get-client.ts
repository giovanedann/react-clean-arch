import { type HttpGetParams, type HttpGetClient } from 'data/protocols/http'

export class HttpGetClientSpy implements HttpGetClient {
  url: string = ''

  async get({ url }: HttpGetParams): Promise<void> {
    this.url = url
    await Promise.resolve()
  }
}
