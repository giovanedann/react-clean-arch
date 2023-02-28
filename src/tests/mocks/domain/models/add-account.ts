import { faker } from '@faker-js/faker'
import { type AddAccountParams } from 'domain/usecases'

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password()

  return {
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
    name: faker.name.fullName()
  }
}
