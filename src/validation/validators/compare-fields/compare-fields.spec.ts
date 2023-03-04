import { faker } from '@faker-js/faker'
import { PasswordsNotMatchError } from 'validation/errors/password-unmatched'
import { CompareFieldsValidation } from './compare-fields'

function createSut(
  field: string,
  compareWith: string
): CompareFieldsValidation<any> {
  return new CompareFieldsValidation(field, compareWith)
}

describe('CompareFieldsValidation', () => {
  it('should return error if fields are not equal', () => {
    const field1 = faker.random.word()
    const field2 = faker.database.column()
    const sut = createSut(field1, field2)
    const error = sut.validate({
      [field1]: faker.random.alphaNumeric(5),
      [field2]: faker.random.alphaNumeric(7)
    })

    expect(error).toBeInstanceOf(PasswordsNotMatchError)
  })

  it('should return null if fields are equal', () => {
    const field1 = faker.random.word()
    const field2 = faker.database.column()
    const equalValue = faker.random.alphaNumeric(5)
    const sut = createSut(field1, field2)

    const validation = sut.validate({
      [field1]: equalValue,
      [field2]: equalValue
    })

    expect(validation).toBeNull()
  })
})
