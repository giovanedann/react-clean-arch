/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { faker } from '@faker-js/faker'
import {
  type AccountModel,
  type Authentication,
  type AuthenticationParams
} from 'domain/models'

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

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
