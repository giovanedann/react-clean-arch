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

  async get(params: HttpGetParams): Promise<HttpResponse> {
    this.getStorage.get('currentAccount')
    await this.httpGetClient.get(params)
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as HttpResponse
  }
}
