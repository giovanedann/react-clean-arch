import { faker } from '@faker-js/faker'
import { EmailValidation, RequiredFieldValidation } from 'validation/validators'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const field = faker.random.word()
    const validations = sut.field(field).required().build()
    expect(validations).toStrictEqual([new RequiredFieldValidation(field)])
  })

  it('should return EmailValidation', () => {
    const field = faker.random.word()
    const validations = sut.field(field).email().build()
    expect(validations).toStrictEqual([new EmailValidation(field)])
  })
})
