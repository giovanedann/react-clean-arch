import { LocalStorageAdapter } from 'infra/cache/local-storage-adapter/local-storage-adapter'

export default function localStorageAdapterFactory(): LocalStorageAdapter {
  return new LocalStorageAdapter()
}
