import { faker } from '@faker-js/faker'
import { type AccountModel } from 'domain/models'
import { type AddAccount, type AddAccountParams } from 'domain/usecases'
import { mockAccountModel } from './authentication'

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password()

  return {
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
    name: faker.name.fullName()
  }
}

export class AddAccountSpy implements AddAccount {
  account: AccountModel = mockAccountModel()
  calls: number = 0
  params: AddAccountParams | null = null

  async add(body: AddAccountParams): Promise<AccountModel> {
    this.params = body
    this.calls += 1
    return this.account
  }
}
