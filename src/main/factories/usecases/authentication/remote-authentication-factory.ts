import RemoteAuthentication from 'data/usecases/authentication/remote-authentication'
import { Authentication } from 'domain/models'
import apiUrlFactory from 'main/factories/http/api-url-factory'
import httpClientFactory from 'main/factories/http/http-client-factory'

export default function remoteAuthenticationFactory(): Authentication {
  return new RemoteAuthentication(apiUrlFactory(), httpClientFactory())
}
