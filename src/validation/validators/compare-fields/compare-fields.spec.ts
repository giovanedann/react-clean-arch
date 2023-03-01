import { faker } from '@faker-js/faker'
import { InvalidFieldError } from 'validation/errors'
import { CompareFieldsValidation } from './compare-fields'

function createSut(compareWith: string): CompareFieldsValidation {
  return new CompareFieldsValidation(faker.random.word(), compareWith)
}

describe('RequiredFieldValidation', () => {
  it('should return error if fields are not equal', () => {
    const sut = createSut(faker.random.word())
    const error = sut.validate(faker.random.word())

    expect(error).toBeInstanceOf(InvalidFieldError)
  })

  it('should return null if fields are equal', () => {
    const value = faker.random.word()
    const sut = createSut(value)
    const validation = sut.validate(value)

    expect(validation).toBeNull()
  })
})
