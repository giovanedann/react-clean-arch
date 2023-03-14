import { type GetStorage } from 'data/protocols/cache'
import {
  type HttpGetParams,
  type HttpResponse,
  type HttpGetClient
} from 'data/protocols/http'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient<any> {
  constructor(private readonly getStorage: GetStorage) {}

  async get(params: HttpGetParams): Promise<HttpResponse> {
    this.getStorage.get('currentAccount')
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as HttpResponse
  }
}
