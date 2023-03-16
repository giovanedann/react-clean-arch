import { type AccountModel } from 'domain/models'
import localStorageAdapterFactory from 'main/factories/cache/local-storage-adapter-factory'

export function setCurrentAccountAdapter(account: AccountModel): void {
  localStorageAdapterFactory().set('currentAccount', account)
}

export function getCurrentAccountAdapter(): AccountModel {
  return localStorageAdapterFactory().get('currentAccount')
}
