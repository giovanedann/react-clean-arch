import { faker } from '@faker-js/faker'
import { RequiredFieldError } from 'validation/errors'
import { RequiredFieldValidation } from 'validation/validators'

function createSut(field: string): RequiredFieldValidation {
  return new RequiredFieldValidation(field)
}

describe.only('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const field = faker.database.column()
    const sut = createSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeInstanceOf(RequiredFieldError)
  })

  it('should return null if field is not empty', () => {
    const field = faker.database.column()
    const sut = createSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeNull()
  })
})
