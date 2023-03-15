import { type GetStorage } from 'data/protocols/cache'
import {
  type HttpGetParams,
  type HttpResponse,
  type HttpGetClient
} from 'data/protocols/http'

export class AuthHttpGetClientDecorator implements HttpGetClient<any> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<any>
  ) {}

  async get({ url, headers }: HttpGetParams): Promise<HttpResponse> {
    const account = this.getStorage.get('currentAccount')

    let requestHeaders = { ...headers }

    if (headers && account?.accessToken) {
      requestHeaders = {
        ...requestHeaders,
        'x-access-token': account.accessToken
      }
    }

    if (!headers && account?.accessToken) {
      requestHeaders = {
        'x-access-token': account.accessToken
      }
    }

    const response = await this.httpGetClient.get({
      url,
      headers: requestHeaders
    })

    return response
  }
}
