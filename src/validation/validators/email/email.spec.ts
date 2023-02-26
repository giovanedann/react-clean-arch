import { faker } from '@faker-js/faker'
import { InvalidFieldError } from 'validation/errors'
import { EmailValidation } from 'validation/validators'

function createSut(): EmailValidation {
  return new EmailValidation(faker.database.column())
}

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = createSut()
    const error = sut.validate(faker.random.word())
    expect(error).toBeInstanceOf(InvalidFieldError)
  })

  it('should return null if email is valid', () => {
    const sut = createSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeNull()
  })

  it('should return null if email is empty', () => {
    const sut = createSut()
    const error = sut.validate('')
    expect(error).toBeNull()
  })
})
