import { type AccountModel } from 'domain/models'

export type AuthenticationParams = {
  password: string
  email: string
}

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
