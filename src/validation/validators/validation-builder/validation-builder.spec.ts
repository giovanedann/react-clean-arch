import { faker } from '@faker-js/faker'
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation
} from 'validation/validators'
import { CompareFieldsValidation } from '../compare-fields/compare-fields'
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

  it('should return MinLengthValidation', () => {
    const field = faker.random.word()
    const minLength = Number(faker.random.numeric())
    const validations = sut.field(field).minLength(minLength).build()
    expect(validations).toStrictEqual([
      new MinLengthValidation(field, minLength)
    ])
  })

  it('should return CompareFieldsValidation', () => {
    const field = faker.random.alphaNumeric(4)
    const fieldToCompare = faker.random.alphaNumeric(7)
    const validations = sut
      .field(field)
      .compareWithField(fieldToCompare)
      .build()

    expect(validations).toStrictEqual([
      new CompareFieldsValidation(field, fieldToCompare)
    ])
  })

  it('should return a list of field validators', () => {
    const field = faker.random.word()
    const minLength = Number(faker.random.numeric())
    const validations = sut
      .field(field)
      .required()
      .email()
      .minLength(minLength)
      .build()

    expect(validations).toStrictEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, minLength)
    ])
  })
})
