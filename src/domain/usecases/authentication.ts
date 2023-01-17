import { AccountModel } from 'domain/models/account'

type AuthenticationParams = {
  password: string
  email: string
}

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
