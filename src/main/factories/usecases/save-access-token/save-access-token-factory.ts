import { LocalSaveAccessToken } from 'data/usecases/local-save-access-token/local-save-access-token'
import { type SaveAccessToken } from 'domain/usecases'
import localStorageAdapterFactory from 'main/factories/cache/local-storage-adapter-factory'

export default function localSaveAccessTokenFactory(): SaveAccessToken {
  return new LocalSaveAccessToken(localStorageAdapterFactory())
}
