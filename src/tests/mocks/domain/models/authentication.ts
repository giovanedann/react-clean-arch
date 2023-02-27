/* eslint-disable @typescript-eslint/consistent-type-assertions */
import {
  type AccountModel,
  type Authentication,
  type AuthenticationParams
} from 'domain/models'
import { mockAccountModel } from 'domain/tests/mocks'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams = {} as AuthenticationParams
  calls: number = 0

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    this.calls += 1
    return await Promise.resolve(this.account)
  }
}
