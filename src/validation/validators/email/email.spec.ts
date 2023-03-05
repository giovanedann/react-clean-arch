import { faker } from '@faker-js/faker'
import { InvalidFieldError } from 'validation/errors'
import { EmailValidation } from 'validation/validators'

function createSut(field: string): EmailValidation {
  return new EmailValidation(field)
}

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const field = faker.database.column()
    const sut = createSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeInstanceOf(InvalidFieldError)
  })

  it('should return null if email is valid', () => {
    const field = faker.database.column()
    const sut = createSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeNull()
  })

  it('should return null if email is empty', () => {
    const field = faker.database.column()
    const sut = createSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeNull()
  })
})
