import { type SetStorage, type GetStorage } from 'data/protocols/cache'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: any): void {
    if (!value) {
      localStorage.removeItem(key)
      return
    }

    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string): any {
    const localStorageItem = localStorage.getItem(key)
    return localStorageItem ? JSON.parse(localStorageItem) : null
  }
}
