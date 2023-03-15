import { type AccountModel } from 'domain/models'

export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Model>
}

export namespace Authentication {
  export type Params = {
    password: string
    email: string
  }

  export type Model = AccountModel
}
