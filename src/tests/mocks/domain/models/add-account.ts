import { faker } from '@faker-js/faker'
import { type AddAccount } from 'domain/usecases'
import { mockAccountModel } from './account'

export const mockAddAccount = (): AddAccount.Params => {
  const password = faker.internet.password()

  return {
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
    name: faker.name.fullName()
  }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()

export class AddAccountSpy implements AddAccount {
  account: AddAccount.Model = mockAddAccountModel()
  calls: number = 0
  params: AddAccount.Params | null = null

  async add(body: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = body
    this.calls += 1
    return this.account
  }
}
