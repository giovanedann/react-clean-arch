import { faker } from '@faker-js/faker'
import { type AccountModel } from 'domain/models'

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.firstName()
})
