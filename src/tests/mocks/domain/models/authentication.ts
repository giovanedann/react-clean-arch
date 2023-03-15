/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { faker } from '@faker-js/faker'
import { type Authentication } from 'domain/usecases'
import { mockAccountModel } from './account'

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel()
  params: Authentication.Params = {} as Authentication.Params
  calls: number = 0

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params
    this.calls += 1
    return await Promise.resolve(this.account)
  }
}

export const mockAuthenticationModel = (): Authentication.Model => mockAccountModel()

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
