import { type GetStorage } from 'data/protocols/cache'
import {
  type HttpRequest,
  type HttpResponse,
  type HttpClient
} from 'data/protocols/http'

export class AuthHttpClientDecorator implements HttpClient<any> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpClient<any>
  ) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    const account = this.getStorage.get('currentAccount')

    let requestHeaders = { ...data.headers }

    if (data.headers && account?.accessToken) {
      requestHeaders = {
        ...requestHeaders,
        'x-access-token': account.accessToken
      }
    }

    if (!data.headers && account?.accessToken) {
      requestHeaders = {
        'x-access-token': account.accessToken
      }
    }

    const response = await this.httpGetClient.request({
      url: data.url,
      method: data.method,
      body: data.body,
      headers: requestHeaders
    })

    return response
  }
}
