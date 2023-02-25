import { faker } from '@faker-js/faker'
import { InvalidFieldError } from 'validation/errors'
import { EmailValidation } from 'validation/validators/email/email'

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toBeInstanceOf(InvalidFieldError)
  })

  it('should return null if email is valid', () => {
    const sut = new EmailValidation(faker.random.word())
    const error = sut.validate(faker.internet.email())
    expect(error).toBeNull()
  })
})
