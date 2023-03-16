import { type SetStorage } from 'data/protocols/cache'
import { type AccountModel } from 'domain/models'
import { type SaveCurrentAccount } from 'domain/usecases'

export class LocalSaveCurrentAccount implements SaveCurrentAccount {
  constructor(private readonly setStorage: SetStorage) {}

  async save(account: AccountModel | null): Promise<void> {
    if (!account) {
      this.setStorage.set('currentAccount', account)
      return
    }
    this.setStorage.set('currentAccount', JSON.stringify(account))
  }
}
