import { type SetStorage } from 'data/protocols/cache'
import { LocalStorageAdapter } from 'infra/cache/local-storage-adapter/local-storage-adapter'

export default function localStorageAdapterFactory(): SetStorage {
  return new LocalStorageAdapter()
}
