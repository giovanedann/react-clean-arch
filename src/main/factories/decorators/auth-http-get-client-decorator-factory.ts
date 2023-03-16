import { type HttpGetClient } from 'data/protocols/http'
import { AuthHttpGetClientDecorator } from 'main/decorators/auth-http-get-client/auth-http-get-client-decorator'
import localStorageAdapterFactory from '../cache/local-storage-adapter-factory'
import httpClientFactory from '../http/http-client-factory'

export function authHttpGetClientDecoratorFactory(): HttpGetClient<any> {
  return new AuthHttpGetClientDecorator(
    localStorageAdapterFactory(),
    httpClientFactory()
  )
}
