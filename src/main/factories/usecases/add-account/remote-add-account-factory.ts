import { RemoteAddAccount } from 'data/usecases/add-account/remote-add-account'
import { type AddAccount } from 'domain/usecases'
import apiUrlFactory from 'main/factories/http/api-url-factory'
import httpClientFactory from 'main/factories/http/http-client-factory'

export default function remoteAddAccountFactory(): AddAccount {
  return new RemoteAddAccount(apiUrlFactory('/signup'), httpClientFactory())
}
