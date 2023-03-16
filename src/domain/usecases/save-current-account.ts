import { type AccountModel } from 'domain/models'

export interface SaveCurrentAccount {
  save: (accountModel: AccountModel | null) => void
}
