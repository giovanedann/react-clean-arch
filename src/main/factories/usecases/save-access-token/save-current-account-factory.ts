import { LocalSaveCurrentAccount } from 'data/usecases/local-save-access-token/local-save-current-account'
import { type SaveCurrentAccount } from 'domain/usecases'
import localStorageAdapterFactory from 'main/factories/cache/local-storage-adapter-factory'

export default function localSaveCurrentAccountFactory(): SaveCurrentAccount {
  return new LocalSaveCurrentAccount(localStorageAdapterFactory())
}
