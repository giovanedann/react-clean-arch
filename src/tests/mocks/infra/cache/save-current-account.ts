import { type AccountModel } from 'domain/models'
import { type SaveCurrentAccount } from 'domain/usecases'

export class SaveCurrentAccountMock implements SaveCurrentAccount {
  currentAccount: AccountModel | null = null

  async save(account: AccountModel | null): Promise<void> {
    this.currentAccount = account
  }
}
