/* eslint-disable @typescript-eslint/consistent-type-assertions */
import {
  AccountModel,
  Authentication,
  AuthenticationParams
} from 'domain/models'
import { mockAccountModel } from 'domain/tests/mocks'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams = {} as AuthenticationParams

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}
