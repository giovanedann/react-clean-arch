import { type HttpClient } from 'data/protocols/http'
import { AuthHttpClientDecorator } from 'main/decorators/auth-http-client/auth-http-client-decorator'
import localStorageAdapterFactory from '../cache/local-storage-adapter-factory'
import httpClientFactory from '../http/http-client-factory'

export function authHttpClientDecoratorFactory(): HttpClient<any> {
  return new AuthHttpClientDecorator(
    localStorageAdapterFactory(),
    httpClientFactory()
  )
}
