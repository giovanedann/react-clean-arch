import { AuthenticationParams } from 'domain/usecases/authentication'
import { faker } from '@faker-js/faker'
import { AccountModel } from 'domain/models/account'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
